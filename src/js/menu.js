function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!menu || !overlay) return;

  const isOpen = menu.classList.toggle('active');
  overlay.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
