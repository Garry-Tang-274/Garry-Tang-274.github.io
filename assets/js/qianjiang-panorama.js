(() => {
  const chunks = window.__qianjiangChunks || [];
  if (!chunks.length) return;
  const source = `data:image/webp;base64,${chunks.join('')}`;
  document.querySelectorAll('[data-qianjiang-image]').forEach((image) => {
    image.src = source;
  });
  document.querySelectorAll('[data-qianjiang-link]').forEach((link) => {
    link.href = source;
  });
  window.__qianjiangChunks = [];
})();
