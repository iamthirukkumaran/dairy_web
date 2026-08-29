'use client';

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { pixelRatio, type Quality } from '@/lib/webgl';

export type StageContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
};

/**
 * Shared WebGL plumbing: a renderer sized to its container, a colour pipeline
 * tuned to Aura's warm paper palette, and a frame loop that only runs while
 * the canvas is actually on screen and the tab is visible.
 *
 * `build` creates the scene contents once and returns a per-frame callback.
 */
export function useThreeStage(
  container: RefObject<HTMLDivElement | null>,
  quality: Quality,
  build: (ctx: StageContext) => (time: number, ctx: StageContext) => void,
) {
  // Keep the newest builder without restarting the scene every render.
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const el = container.current;
    if (!el || quality === 'off') return;

    const renderer = new THREE.WebGLRenderer({
      antialias: quality === 'high',
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(pixelRatio(quality));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);

    const ctx: StageContext = { scene, camera, renderer, width: 1, height: 1 };

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      ctx.width = w;
      ctx.height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const frame = buildRef.current(ctx);

    let raf = 0;
    let visible = true;
    let onScreen = true;
    const clock = new THREE.Clock();

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || !onScreen) return;
      frame(clock.getElapsedTime(), ctx);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { rootMargin: '120px' },
    );
    io.observe(el);

    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [container, quality]);
}
