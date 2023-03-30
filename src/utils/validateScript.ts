export default function validateScript(t) {
  const c = window.location.origin;
  // @TODO: Remove main.js
  return (
    // (-1 < t.indexOf(c) || -1 < t.indexOf("bayar.kelola.id")) &&
    (-1 < t.indexOf("main.js") || -1 < t.indexOf("main.ts") ||
      -1 < t.indexOf("quix.js") ||
      -1 < t.indexOf("quix.min.js"))
  );
}