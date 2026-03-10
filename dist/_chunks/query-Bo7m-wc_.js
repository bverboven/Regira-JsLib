function t(n) {
  const r = new URLSearchParams();
  return Object.entries(n || {}).forEach(([a, e]) => {
    Array.isArray(e) ? e.forEach((c) => r.append(a, c)) : r.append(a, e);
  }), r;
}
export {
  t as c
};
