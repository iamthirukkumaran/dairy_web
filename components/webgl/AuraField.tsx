'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeStage } from './useThreeStage';
import { pixelRatio, type Quality } from '@/lib/webgl';
import { seeded } from '@/lib/utils';

const PALETTES = {
  sunrise: ['#FFF3D6', '#F6E2B8', '#F2C7A9', '#E8DCC4', '#FFFFFF'],
  sunset: ['#F7D6B4', '#EFC2A2', '#D9C8E4', '#F6E2B8', '#FFF6EA'],
} as const;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSize;
  attribute vec3 aTint;
  varying float vAlpha;
  varying vec3 vTint;

  void main() {
    vec3 p = position;
    // Each mote rises on its own clock and wraps, so the field never empties.
    float span = 13.0;
    p.y += mod(uTime * (0.05 + aSeed * 0.09) + aSeed * span, span) - span * 0.5;
    p.x += sin(uTime * 0.22 + aSeed * 6.2831) * 0.42;
    p.z += cos(uTime * 0.17 + aSeed * 3.1415) * 0.3;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (16.0 / max(dist, 0.6));
    // Fade in from the near plane and out into the distance.
    vAlpha = smoothstep(0.4, 2.4, dist) * (1.0 - smoothstep(13.0, 21.0, dist));
    vTint = aTint;
  }
`;

const FRAG = /* glsl */ `
  varying float vAlpha;
  varying vec3 vTint;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.04, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vTint, a * vAlpha * 0.62);
  }
`;

/**
 * A real volumetric field of pollen and light in front of the landscape.
 *
 * This is the one thing CSS genuinely cannot do here: motes at true depths,
 * size-attenuated by perspective, so moving the pointer parallaxes them
 * against each other instead of sliding a flat layer. Everything runs on the
 * GPU — no per-frame work on the main thread.
 */
export function AuraField({
  tone = 'sunrise',
  quality,
  className,
}: {
  tone?: keyof typeof PALETTES;
  quality: Quality;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (quality === 'off') return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [quality]);

  useThreeStage(container, quality, (ctx) => {
    const count = quality === 'high' ? 760 : 240;
    const palette = PALETTES[tone].map((hex) => new THREE.Color(hex));

    const positions = new Float32Array(count * 3);
    const tints = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const r1 = seeded(i + 1);
      const r2 = seeded(i + 501);
      const r3 = seeded(i + 1009);
      const r4 = seeded(i + 1511);
      positions[i * 3] = (r1 - 0.5) * 20;
      positions[i * 3 + 1] = (r2 - 0.5) * 12;
      // Bias towards the middle distance so the field reads as volume.
      positions[i * 3 + 2] = -1.5 - r3 * r3 * 15;
      const c = palette[Math.floor(r4 * palette.length)];
      tints[i * 3] = c.r;
      tints[i * 3 + 1] = c.g;
      tints[i * 3 + 2] = c.b;
      seeds[i] = r1;
      sizes[i] = 1.1 + r4 * 3.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aTint', new THREE.BufferAttribute(tints, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio(quality) },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    ctx.scene.add(points);

    ctx.camera.position.set(0, 0, 0.5);

    return (time) => {
      material.uniforms.uTime.value = time;
      // The camera drifts after the pointer; it never tracks it exactly.
      const tx = pointer.current.x * 0.85;
      const ty = -pointer.current.y * 0.45;
      ctx.camera.position.x += (tx - ctx.camera.position.x) * 0.025;
      ctx.camera.position.y += (ty - ctx.camera.position.y) * 0.025;
      ctx.camera.lookAt(0, 0, -8);
    };
  });

  if (quality === 'off') return null;

  return <div ref={container} aria-hidden="true" className={className} />;
}
