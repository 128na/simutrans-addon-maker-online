export function rect(count: number, size: number, gap: number, dark = false): string {
  const fill = dark ? "white" : "black";
  const rects = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const [ox, oy] = [(gap + size) * x, (gap + size) * y];
      rects.push(
        `<rect width='${size}' height='${size}' x='${ox}' y='${oy}' fill='${fill}'/>`
      );
    }
  }
  const scale = size * count + gap * (count - 1);
  const el = rects.join("");
  return `img:data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' height='${scale}' width='${scale}'>${el}</svg>`;
}