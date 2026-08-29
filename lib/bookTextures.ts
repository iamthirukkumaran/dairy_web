'use client';

import type { Spread } from '@/data/book';
import { yearStats } from '@/data/year';

/** Resolve the real font families Next generated, so canvas matches the page. */
export function resolveFonts() {
  if (typeof document === 'undefined') return { serif: 'Georgia, serif', sans: 'system-ui, sans-serif' };
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden';
  probe.className = 'font-serif';
  document.body.appendChild(probe);
  const serif = getComputedStyle(probe).fontFamily || 'Georgia, serif';
  probe.className = 'font-sans';
  const sans = getComputedStyle(probe).fontFamily || 'system-ui, sans-serif';
  probe.remove();
  return { serif, sans };
}

const PAPER = '#FCF7EC';
const INK = '#2A2521';
const SOFT = 'rgba(42,37,33,0.62)';
const FAINT = 'rgba(42,37,33,0.38)';

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let cursor = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursor);
      cursor += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursor);
  return cursor + lineHeight;
}

/**
 * Draws one printed page onto a canvas for use as a texture.
 * `side` only changes which edge the gutter shading falls on.
 */
export function drawPage(spread: Spread, side: 'left' | 'right', scale = 1): HTMLCanvasElement {
  const W = Math.round(600 * scale);
  const H = Math.round(800 * scale);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const { serif, sans } = resolveFonts();
  const M = W * 0.13;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Faint paper fibre
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 900 * scale; i += 1) {
    ctx.fillStyle = i % 2 ? '#8C7B62' : '#FFFFFF';
    ctx.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;

  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  const kicker = (text: string, y: number) => {
    ctx.font = `600 ${Math.round(15 * scale)}px ${sans}`;
    ctx.fillStyle = FAINT;
    ctx.letterSpacing = `${2 * scale}px`;
    ctx.fillText(text.toUpperCase(), M, y);
    ctx.letterSpacing = '0px';
  };

  if (spread.kind === 'chapter') {
    ctx.textAlign = 'center';
    ctx.font = `600 ${Math.round(15 * scale)}px ${sans}`;
    ctx.fillStyle = FAINT;
    ctx.letterSpacing = `${2 * scale}px`;
    ctx.fillText((spread.kicker ?? '').toUpperCase(), W / 2, H * 0.36);
    ctx.letterSpacing = '0px';
    ctx.font = `${Math.round(84 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    ctx.fillText(spread.title ?? '', W / 2, H * 0.42);
    ctx.fillStyle = 'rgba(42,37,33,0.2)';
    ctx.fillRect(W / 2 - 26 * scale, H * 0.56, 52 * scale, 1.5 * scale);
    ctx.font = `${Math.round(15 * scale)}px ${sans}`;
    ctx.fillStyle = FAINT;
    ctx.fillText(spread.meta ?? '', W / 2, H * 0.59);
    ctx.textAlign = 'left';
  } else if (spread.kind === 'photo') {
    const iw = W - M * 2;
    const ih = iw * 0.72;
    ctx.fillStyle = '#DCE3DA';
    ctx.fillRect(M, M, iw, ih);
    ctx.fillStyle = '#F1DDB4';
    ctx.beginPath();
    ctx.arc(M + iw * 0.74, M + ih * 0.28, iw * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#AFC6A8';
    ctx.beginPath();
    ctx.moveTo(M, M + ih * 0.62);
    ctx.quadraticCurveTo(M + iw * 0.4, M + ih * 0.5, M + iw, M + ih * 0.6);
    ctx.lineTo(M + iw, M + ih);
    ctx.lineTo(M, M + ih);
    ctx.fill();
    ctx.fillStyle = '#7E9C77';
    ctx.beginPath();
    ctx.moveTo(M, M + ih * 0.78);
    ctx.quadraticCurveTo(M + iw * 0.5, M + ih * 0.68, M + iw, M + ih * 0.76);
    ctx.lineTo(M + iw, M + ih);
    ctx.lineTo(M, M + ih);
    ctx.fill();
    kicker(spread.kicker ?? '', M + ih + 34 * scale);
    ctx.font = `${Math.round(30 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    wrap(ctx, spread.title ?? '', M, M + ih + 62 * scale, W - M * 2, 36 * scale);
    ctx.font = `${Math.round(15 * scale)}px ${sans}`;
    ctx.fillStyle = FAINT;
    ctx.fillText(spread.meta ?? '', M, M + ih + 140 * scale);
  } else if (spread.kind === 'reflection') {
    kicker(spread.kicker ?? '', H * 0.34);
    ctx.font = `${Math.round(40 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    wrap(ctx, `“${spread.title}”`, M, H * 0.4, W - M * 2, 48 * scale);
    ctx.font = `${Math.round(15 * scale)}px ${sans}`;
    ctx.fillStyle = FAINT;
    wrap(ctx, spread.body?.[0] ?? '', M, H * 0.62, W - M * 2, 22 * scale);
  } else if (spread.kind === 'summary') {
    kicker(spread.kicker ?? '', M);
    ctx.font = `${Math.round(38 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    ctx.fillText(spread.title ?? '', M, M + 32 * scale);
    let y = M + 108 * scale;
    for (const stat of yearStats) {
      ctx.font = `${Math.round(16 * scale)}px ${sans}`;
      ctx.fillStyle = SOFT;
      ctx.fillText(stat.label, M, y);
      ctx.font = `${Math.round(30 * scale)}px ${serif}`;
      ctx.fillStyle = INK;
      ctx.textAlign = 'right';
      ctx.fillText(stat.value, W - M, y - 8 * scale);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(42,37,33,0.14)';
      ctx.fillRect(M, y + 34 * scale, W - M * 2, 1.2 * scale);
      y += 66 * scale;
    }
    y += 20 * scale;
    ['Slowing down', 'Work', 'Home', 'Long walks'].forEach((t, i) => {
      ctx.font = `${Math.round(15 * scale)}px ${sans}`;
      ctx.fillStyle = FAINT;
      ctx.fillText(t, M, y);
      ctx.fillStyle = 'rgba(190,111,76,0.4)';
      ctx.fillRect(M + 150 * scale, y + 8 * scale, (W - M * 2 - 160 * scale) * (0.92 - i * 0.16), 1.4 * scale);
      y += 34 * scale;
    });
  } else if (spread.kind === 'final') {
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#6F8C69';
    ctx.lineWidth = 2.5 * scale;
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.52);
    ctx.lineTo(W / 2, H * 0.42);
    ctx.stroke();
    ctx.fillStyle = '#A9C0A2';
    ctx.beginPath();
    ctx.ellipse(W / 2 - 26 * scale, H * 0.48, 26 * scale, 9 * scale, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8FAE88';
    ctx.beginPath();
    ctx.ellipse(W / 2 + 26 * scale, H * 0.45, 26 * scale, 9 * scale, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#F2C7A9';
    ctx.beginPath();
    ctx.arc(W / 2, H * 0.4, 15 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `${Math.round(36 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    ctx.fillText(spread.title ?? '', W / 2, H * 0.56);
    ctx.textAlign = 'left';
  } else {
    kicker(`${spread.kicker} · ${spread.meta}`, M);
    ctx.font = `${Math.round(34 * scale)}px ${serif}`;
    ctx.fillStyle = INK;
    let y = wrap(ctx, spread.title ?? '', M, M + 30 * scale, W - M * 2, 40 * scale) + 16 * scale;
    ctx.font = `${Math.round(16 * scale)}px ${sans}`;
    ctx.fillStyle = SOFT;
    for (const para of spread.body ?? []) {
      y = wrap(ctx, para, M, y, W - M * 2, 27 * scale) + 12 * scale;
    }
  }

  // Running foot
  ctx.font = `${Math.round(13 * scale)}px ${sans}`;
  ctx.fillStyle = 'rgba(42,37,33,0.3)';
  if (spread.kind !== 'final') ctx.fillText('AURA', M, H - M * 0.7);
  ctx.textAlign = 'right';
  ctx.fillText(spread.pageNumber ?? '', W - M, H - M * 0.7);
  ctx.textAlign = 'left';

  // Gutter shading — the page curving into the spine
  const g =
    side === 'right'
      ? ctx.createLinearGradient(0, 0, W * 0.16, 0)
      : ctx.createLinearGradient(W, 0, W * 0.84, 0);
  g.addColorStop(0, 'rgba(42,37,33,0.26)');
  g.addColorStop(1, 'rgba(42,37,33,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  return canvas;
}

/** Woven book cloth, generated so the boards are not flat colour. */
export function drawCloth(color: string, size = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = 0.09;
  for (let i = 0; i < size; i += 3) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(i, 0, 1, size);
    ctx.fillRect(0, i, size, 1);
    ctx.fillStyle = '#000000';
    ctx.fillRect(i + 1, 0, 1, size);
    ctx.fillRect(0, i + 1, size, 1);
  }
  ctx.globalAlpha = 1;
  return canvas;
}

/** The foil-stamped front board. */
export function drawCover(
  title: string,
  subtitle: string,
  cloth: string,
  foil: string,
): HTMLCanvasElement {
  const W = 600;
  const H = 800;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const { serif, sans } = resolveFonts();

  ctx.drawImage(drawCloth(cloth, 300), 0, 0, W, H);

  // Blind-embossed rule
  ctx.strokeStyle = `${foil}55`;
  ctx.lineWidth = 2;
  ctx.strokeRect(W * 0.07, H * 0.055, W * 0.86, H * 0.89);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Botanical mark
  ctx.strokeStyle = foil;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2, H * 0.34);
  ctx.lineTo(W / 2, H * 0.24);
  ctx.stroke();
  ctx.fillStyle = foil;
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.ellipse(W / 2 - 34, H * 0.31, 34, 12, -0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(W / 2 + 34, H * 0.285, 34, 12, 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(W / 2, H * 0.225, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  const size = title.length > 12 ? 44 : 62;
  ctx.font = `${size}px ${serif}`;
  ctx.fillStyle = foil;
  ctx.letterSpacing = '5px';
  wrapCentered(ctx, title, W / 2, H * 0.5, W * 0.78, size * 1.15);
  ctx.letterSpacing = '0px';

  ctx.fillStyle = `${foil}88`;
  ctx.fillRect(W / 2 - 60, H * 0.6, 120, 1.6);

  ctx.font = `20px ${sans}`;
  ctx.fillStyle = `${foil}bb`;
  ctx.letterSpacing = '3px';
  ctx.fillText(subtitle.toUpperCase(), W / 2, H * 0.65);
  ctx.letterSpacing = '0px';

  return canvas;
}

function wrapCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  const start = cy - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, start + i * lineHeight));
}

/** Endpaper: the printed garden inside the boards. */
export function drawEndpaper(): HTMLCanvasElement {
  const W = 512;
  const H = 682;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#EFE4D0';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(169,136,95,0.55)';
  ctx.fillStyle = 'rgba(201,168,124,0.6)';
  ctx.lineWidth = 1.4;
  for (let row = 0; row < 14; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      const x = col * 52 + 26 + (row % 2) * 26;
      const y = row * 50 + 30;
      ctx.beginPath();
      ctx.moveTo(x, y + 26);
      ctx.lineTo(x, y + 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x - 10, y + 17, 11, 4, -0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x + 10, y + 11, 11, 4, 0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return canvas;
}
