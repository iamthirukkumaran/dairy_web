'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMotionValueEvent, type MotionValue } from 'motion/react';
import { useThreeStage } from './useThreeStage';
import type { Quality } from '@/lib/webgl';
import { spreads, type Cover } from '@/data/book';
import { drawCloth, drawCover, drawEndpaper, drawPage } from '@/lib/bookTextures';

/** Same timeline as the CSS book, so the captions stay in sync either way. */
const OPEN_START = 0.14;
const OPEN_END = 0.3;
const TURN_START = 0.32;
const TURN_END = 0.86;
const CLOSE_START = 0.88;

const PAGE_W = 1.5;
const PAGE_H = 2.0;
const BOARD_W = 1.56;
const BOARD_H = 2.09;
const BOARD_T = 0.045;
const BLOCK_T = 0.15;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const map = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

/**
 * The book, in real three dimensions.
 *
 * This is the one place WebGL genuinely earns its weight: hard boards with
 * cloth that catches the light, a page block with thickness, sheets that bow
 * as they turn, and a shadow that is actually cast by the geometry rather
 * than painted underneath it. Everything else on the page stays CSS.
 *
 * Falls back to the CSS book whenever `quality` is 'off'.
 */
export function Book3D({
  progress,
  cover,
  quality,
  className,
}: {
  progress: MotionValue<number>;
  cover: Cover;
  quality: Quality;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const p = useRef(progress.get());
  const pointer = useRef({ x: 0, y: 0 });
  const parts = useRef<{
    coverMat?: THREE.MeshStandardMaterial[];
    clothMats?: THREE.MeshStandardMaterial[];
  }>({});

  useMotionValueEvent(progress, 'change', (v) => {
    p.current = v;
  });

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
    const { scene, camera, renderer } = ctx;
    const high = quality === 'high';

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const tex = (canvas: HTMLCanvasElement, aniso = 8) => {
      const t = new THREE.CanvasTexture(canvas);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(aniso, renderer.capabilities.getMaxAnisotropy());
      t.needsUpdate = true;
      return t;
    };

    /* ---------------------------------------------------------- lighting */
    scene.add(new THREE.HemisphereLight(0xfff6e6, 0xc9bfae, 0.9));
    scene.add(new THREE.AmbientLight(0xfff4e2, 0.34));

    const key = new THREE.DirectionalLight(0xfff3dc, 1.6);
    key.position.set(2.6, 4.2, 3.4);
    key.castShadow = true;
    key.shadow.mapSize.set(high ? 1024 : 512, high ? 1024 : 512);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 14;
    key.shadow.camera.left = -3.5;
    key.shadow.camera.right = 3.5;
    key.shadow.camera.top = 3.5;
    key.shadow.camera.bottom = -3.5;
    key.shadow.bias = -0.0012;
    key.shadow.radius = 3;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe9dff0, 0.42);
    fill.position.set(-3.4, 1.4, 2.2);
    scene.add(fill);

    /* ------------------------------------------------------------ ground */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.ShadowMaterial({ opacity: 0.24 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -PAGE_H / 2 - 0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    /* -------------------------------------------------------------- book */
    const book = new THREE.Group();
    scene.add(book);

    const clothTex = tex(drawCloth(cover.cloth), 4);
    clothTex.wrapS = clothTex.wrapT = THREE.RepeatWrapping;
    clothTex.repeat.set(15, 20);
    const clothMat = new THREE.MeshStandardMaterial({
      map: clothTex,
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.02,
    });
    const paperMat = new THREE.MeshStandardMaterial({ color: 0xf2e9d6, roughness: 0.95 });

    // Back board
    const back = new THREE.Mesh(new THREE.BoxGeometry(BOARD_W, BOARD_H, BOARD_T), clothMat);
    back.position.set(BOARD_W / 2 - 0.03, 0, -BLOCK_T / 2 - BOARD_T / 2);
    back.castShadow = true;
    back.receiveShadow = true;
    book.add(back);

    // Page block (the fore-edge you can see)
    const block = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, PAGE_H, BLOCK_T * 0.9), paperMat);
    block.position.set(PAGE_W / 2 + 0.02, 0, 0);
    block.castShadow = true;
    block.receiveShadow = true;
    book.add(block);

    // Spine
    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, BOARD_H, BLOCK_T + BOARD_T * 2),
      clothMat,
    );
    spine.position.set(-0.035, 0, 0);
    spine.castShadow = true;
    book.add(spine);

    /* ------------------------------------------------------ front board */
    const coverPivot = new THREE.Group();
    book.add(coverPivot);

    const coverTex = tex(drawCover(cover.title, cover.subtitle, cover.cloth, cover.foil), 8);
    const endpaperTex = tex(drawEndpaper(), 4);
    const coverFace = new THREE.MeshStandardMaterial({ map: coverTex, roughness: 0.86 });
    const endpaperFace = new THREE.MeshStandardMaterial({ map: endpaperTex, roughness: 0.95 });
    // BoxGeometry material order: +x, -x, +y, -y, +z, -z
    const coverMats = [clothMat, clothMat, clothMat, clothMat, coverFace, endpaperFace];
    const front = new THREE.Mesh(new THREE.BoxGeometry(BOARD_W, BOARD_H, BOARD_T), coverMats);
    front.position.set(BOARD_W / 2 - 0.03, 0, BLOCK_T / 2 + BOARD_T / 2);
    front.castShadow = true;
    front.receiveShadow = true;
    coverPivot.add(front);

    parts.current.coverMat = [coverFace, endpaperFace];
    parts.current.clothMats = [clothMat];

    /* ------------------------------------------------------------ leaves */
    const leafCount = spreads.length - 1;
    const segments = high ? 26 : 12;

    type Leaf = {
      pivot: THREE.Group;
      front: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
      back: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
      base: Float32Array;
      from: number;
      to: number;
    };

    const slice = (TURN_END - TURN_START) / leafCount;
    const leaves: Leaf[] = [];

    // Static right-hand page: the last spread, waiting under everything.
    const lastPage = new THREE.Mesh(
      new THREE.PlaneGeometry(PAGE_W, PAGE_H),
      new THREE.MeshStandardMaterial({ map: tex(drawPage(spreads[leafCount], 'right')), roughness: 0.95 }),
    );
    lastPage.position.set(PAGE_W / 2 + 0.02, 0, BLOCK_T / 2 + 0.002);
    book.add(lastPage);

    for (let i = 0; i < leafCount; i += 1) {
      const pivot = new THREE.Group();
      book.add(pivot);

      const makeFace = (canvas: HTMLCanvasElement, flip: boolean) => {
        const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_H, segments, 2);
        geo.translate(PAGE_W / 2, 0, 0); // hinge on the spine
        const mat = new THREE.MeshStandardMaterial({
          map: tex(canvas),
          roughness: 0.95,
          side: THREE.FrontSide,
        });
        const mesh = new THREE.Mesh(geo, mat);
        if (flip) {
          mesh.rotation.y = Math.PI;
          mesh.position.x = PAGE_W;
          mesh.position.z = -0.004;
        } else {
          mesh.position.z = 0.004;
        }
        mesh.castShadow = true;
        pivot.add(mesh);
        return mesh;
      };

      const frontMesh = makeFace(drawPage(spreads[i], 'right'), false);
      const backMesh = makeFace(drawPage(spreads[i], 'left'), true);

      leaves.push({
        pivot,
        front: frontMesh,
        back: backMesh,
        base: Float32Array.from(frontMesh.geometry.attributes.position.array),
        from: TURN_START + i * slice,
        to: TURN_START + i * slice + slice * 0.6,
      });
    }

    /* ------------------------------------------------------------ camera */
    camera.position.set(0.9, 0.4, 4.4);
    camera.lookAt(PAGE_W / 2, 0, 0);

    const target = new THREE.Vector3(PAGE_W / 2, 0, 0);
    const camPos = new THREE.Vector3(0.95, 0.95, 6.0);

    /**
     * Bows a turning sheet. The bend peaks when the page is upright and
     * flattens as it lands, which is what stops it reading as a rotating card.
     */
    const bendLeaf = (leaf: Leaf, t: number) => {
      const amount = Math.sin(t * Math.PI) * 0.3;
      for (const mesh of [leaf.front, leaf.back]) {
        const attr = mesh.geometry.attributes.position as THREE.BufferAttribute;
        const arr = attr.array as Float32Array;
        for (let v = 0; v < arr.length; v += 3) {
          const x = leaf.base[v];
          const u = x / PAGE_W; // 0 at the spine, 1 at the fore-edge
          const y = leaf.base[v + 1] / PAGE_H;
          arr[v + 2] = leaf.base[v + 2] + Math.sin(u * Math.PI) * amount * (1 - Math.abs(y) * 0.35);
        }
        attr.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
      }
    };

    return (time) => {
      const v = p.current;

      // Cover opens; the board swings a hair past flat, like a real board.
      const openT = ease(map(v, OPEN_START, OPEN_END));
      const closeT = ease(map(v, CLOSE_START, 1));
      coverPivot.rotation.y = -Math.PI * 0.985 * (openT - closeT * openT);

      // Leaves turn, one after another, each bowing on the way over.
      leaves.forEach((leaf, i) => {
        const raw = map(v, leaf.from, leaf.to);
        const t = ease(raw);
        leaf.pivot.rotation.y = -Math.PI * 0.985 * t;

        /*
         * Depth, by hand. An unturned sheet lies on the page block; a landed
         * one lies on the open board, a hair above the endpaper; and while it
         * is in the air it lifts clear of both. Getting this wrong is what
         * makes 3D book mockups look like stacked cards.
         */
        const onBlock = BLOCK_T / 2 + 0.004 + (leafCount - i) * 0.0006;
        const onBoard = -(BLOCK_T / 2 + BOARD_T) + 0.021 + i * 0.0012;
        leaf.pivot.position.z =
          THREE.MathUtils.lerp(onBlock, onBoard, t) + Math.sin(raw * Math.PI) * 0.05;

        if (raw > 0.001 && raw < 0.999) bendLeaf(leaf, raw);
        else if (Math.abs(leaf.front.geometry.attributes.position.array[2]) > 0.0001) bendLeaf(leaf, 0);
      });

      // Camera: approach, then hold the spread. The distance is *fitted* to the
      // viewport rather than fixed, or a tall phone screen crops the spread.
      const approach = ease(map(v, 0, OPEN_START));
      const opened = ease(map(v, OPEN_START, OPEN_END));
      const closing = ease(map(v, CLOSE_START, 1));

      const halfTan = Math.tan((camera.fov * Math.PI) / 360);
      // World units that must be visible, plus breathing room.
      const needW = THREE.MathUtils.lerp(2.0, 3.6, opened * (1 - closing));
      const needH = 2.62;
      const fit = Math.max(needW / (2 * halfTan * Math.max(camera.aspect, 0.35)), needH / (2 * halfTan));

      const focusX = THREE.MathUtils.lerp(PAGE_W / 2, 0.02, opened * (1 - closing));
      const wantZ = fit * THREE.MathUtils.lerp(1.3, 1.0, approach) + closing * 0.5;
      const wantY = THREE.MathUtils.lerp(0.95, 0.3, approach);

      camPos.set(
        focusX + 0.22 + pointer.current.x * 0.42,
        wantY - pointer.current.y * 0.3,
        wantZ,
      );
      camera.position.lerp(camPos, 0.06);

      target.set(focusX, 0, 0);
      camera.lookAt(target);

      // The book itself turns to face you as you arrive, and away as you leave.
      const facing = THREE.MathUtils.lerp(-0.5, -0.17, approach);
      book.rotation.y = THREE.MathUtils.lerp(facing, 0.015, opened) + closing * -0.4;
      book.rotation.x = THREE.MathUtils.lerp(0.34, 0.06, approach);
      book.position.y = Math.sin(time * 0.5) * 0.012;
    };
  });

  // Repaint the boards when someone picks a different cover.
  useEffect(() => {
    const { coverMat, clothMats } = parts.current;
    if (!coverMat || !clothMats) return;
    const face = coverMat[0];
    face.map?.dispose();
    const t = new THREE.CanvasTexture(drawCover(cover.title, cover.subtitle, cover.cloth, cover.foil));
    t.colorSpace = THREE.SRGBColorSpace;
    face.map = t;
    face.needsUpdate = true;

    clothMats.forEach((m) => {
      m.map?.dispose();
      const c = new THREE.CanvasTexture(drawCloth(cover.cloth));
      c.colorSpace = THREE.SRGBColorSpace;
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(15, 20);
      m.map = c;
      m.needsUpdate = true;
    });
  }, [cover]);

  if (quality === 'off') return null;

  return <div ref={container} aria-hidden="true" className={className} />;
}
