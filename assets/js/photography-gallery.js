(() => {
  'use strict';

  const gallery = document.getElementById('photography-gallery');
  if (!gallery) return;
  const links = Array.from(gallery.querySelectorAll('.gallery-photo-link'));
  const dialog = document.getElementById('gallery-lightbox');
  const image = document.getElementById('lightbox-image');
  const imageWrap = document.getElementById('lightbox-image-wrap');
  const stage = document.getElementById('lightbox-stage');
  const closeButton = document.getElementById('lightbox-close');
  const originalLink = document.getElementById('lightbox-original');
  const rawLink = document.getElementById('lightbox-raw');
  const counter = document.getElementById('lightbox-counter');
  const resolution = document.getElementById('lightbox-resolution');
  const status = document.getElementById('lightbox-status');
  const flowButton = document.getElementById('gallery-flow-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentIndex = 0;
  let returnFocus = null;
  let loadGeneration = 0;
  let pendingImages = [];
  let flowFrame = 0;
  let flowRunning = false;
  let flowLastTime = 0;
  let flowPosition = 0;
  let previousScrollBehavior = '';

  gallery.querySelectorAll('.gallery-photo-image').forEach((thumbnail) => {
    const check = () => thumbnail.classList.toggle('is-unavailable', !thumbnail.naturalWidth);
    thumbnail.addEventListener('error', check);
    thumbnail.addEventListener('load', check);
    if (thumbnail.complete) check();
  });

  function stopFlow() {
    if (!flowRunning) return;
    flowRunning = false;
    cancelAnimationFrame(flowFrame);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    flowButton.setAttribute('aria-pressed', 'false');
    flowButton.querySelector('span').textContent = '缓缓浏览';
    flowButton.querySelector('svg').innerHTML = '<path d="M7 4.5 14 10l-7 5.5z"/>';
  }

  function flowStep(time) {
    if (!flowRunning) return;
    const elapsed = flowLastTime ? Math.min(time - flowLastTime, 50) : 0;
    flowLastTime = time;
    flowPosition += elapsed * 0.014;
    window.scrollTo({ top: flowPosition, behavior: 'auto' });
    const collection = gallery.querySelector('.gallery-collection');
    if (collection.getBoundingClientRect().bottom <= window.innerHeight + 2) {
      stopFlow();
      return;
    }
    flowFrame = requestAnimationFrame(flowStep);
  }

  function startFlow() {
    if (reducedMotion.matches || dialog.open || document.hidden) return;
    flowRunning = true;
    flowLastTime = 0;
    flowPosition = window.scrollY;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    flowButton.setAttribute('aria-pressed', 'true');
    flowButton.querySelector('span').textContent = '暂停浏览';
    flowButton.querySelector('svg').innerHTML = '<path d="M7 5v10M13 5v10"/>';
    flowFrame = requestAnimationFrame(flowStep);
  }

  function updateMotionPreference() {
    stopFlow();
    flowButton.hidden = reducedMotion.matches;
  }
  updateMotionPreference();
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotionPreference);
  else if (reducedMotion.addListener) reducedMotion.addListener(updateMotionPreference);
  flowButton.addEventListener('click', () => flowRunning ? stopFlow() : startFlow());
  ['wheel', 'touchstart', 'pointerdown'].forEach((eventName) => {
    window.addEventListener(eventName, (event) => {
      if (!(event.target instanceof Node) || !flowButton.contains(event.target)) stopFlow();
    }, { passive: true });
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopFlow(); });
  window.addEventListener('pagehide', stopFlow);
  document.addEventListener('keydown', (event) => {
    if (flowRunning && ['Escape', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) stopFlow();
  });

  // Native links remain usable when the browser does not support dialogs.
  if (!dialog || typeof dialog.showModal !== 'function' || !links.length) return;
  image.addEventListener('error', () => { image.style.opacity = '0'; });
  image.addEventListener('load', () => { image.style.opacity = '1'; });

  function clearPendingImages() {
    pendingImages.forEach((pending) => {
      pending.onload = null;
      pending.onerror = null;
      pending.removeAttribute('src');
    });
    pendingImages = [];
  }

  function fitImage() {
    if (!dialog.open) return;
    const link = links[currentIndex];
    const ratio = Number(link.dataset.width) / Number(link.dataset.height);
    const style = getComputedStyle(stage);
    const availableWidth = Math.max(1, stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    const availableHeight = Math.max(1, stage.clientHeight);
    const width = Math.min(availableWidth, availableHeight * ratio);
    imageWrap.style.setProperty('--lightbox-width', `${width}px`);
    imageWrap.style.setProperty('--lightbox-height', `${width / ratio}px`);
  }

  function showPhoto(index) {
    currentIndex = (index + links.length) % links.length;
    const link = links[currentIndex];
    const thumbnail = link.querySelector('img');
    const generation = ++loadGeneration;
    let originalReady = false;
    clearPendingImages();
    image.alt = thumbnail.alt;
    image.src = thumbnail.currentSrc || thumbnail.src;
    imageWrap.style.setProperty('--lightbox-placeholder', getComputedStyle(link).backgroundImage);
    imageWrap.style.backgroundColor = getComputedStyle(link.parentElement).backgroundColor;
    counter.textContent = `${currentIndex + 1} / ${links.length}`;
    resolution.textContent = `${link.dataset.width} × ${link.dataset.height}`;
    originalLink.href = link.href;
    rawLink.hidden = !link.dataset.rawOriginal;
    if (link.dataset.rawOriginal) rawLink.href = link.dataset.rawOriginal;
    else rawLink.removeAttribute('href');
    status.textContent = '正在载入原图…';
    fitImage();

    const preview = new Image();
    preview.decoding = 'async';
    preview.referrerPolicy = 'no-referrer';
    preview.onload = () => {
      if (generation === loadGeneration && dialog.open && !originalReady) image.src = preview.src;
    };
    preview.src = link.dataset.preview;
    pendingImages.push(preview);
    const original = new Image();
    original.decoding = 'async';
    original.referrerPolicy = 'no-referrer';
    original.onload = () => {
      if (generation !== loadGeneration || !dialog.open) return;
      originalReady = true;
      image.src = original.src;
      status.textContent = '原图已载入';
    };
    original.onerror = () => {
      if (generation !== loadGeneration || !dialog.open) return;
      status.textContent = '原图暂未载入，可点右上角单独打开。';
    };
    original.src = link.href;
    pendingImages.push(original);
  }

  function openPhoto(index, trigger) {
    stopFlow();
    returnFocus = trigger;
    document.documentElement.classList.add('gallery-lightbox-open');
    dialog.showModal();
    showPhoto(index);
    closeButton.focus({ preventScroll: true });
  }

  links.forEach((link, index) => link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openPhoto(index, link);
  }));
  closeButton.addEventListener('click', () => dialog.close());
  document.getElementById('lightbox-previous').addEventListener('click', () => showPhoto(currentIndex - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));
  stage.addEventListener('click', (event) => { if (event.target === stage) dialog.close(); });
  dialog.addEventListener('close', () => {
    ++loadGeneration;
    clearPendingImages();
    image.removeAttribute('src');
    document.documentElement.classList.remove('gallery-lightbox-open');
    returnFocus?.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', (event) => {
    if (!dialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentIndex - 1); }
  });
  window.addEventListener('resize', fitImage, { passive: true });
  let touchStart = null;
  stage.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || event.target.closest('button')) { touchStart = null; return; }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) showPhoto(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
