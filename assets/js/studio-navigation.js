/* Controle único do menu Studio. */
(() => {
  'use strict';
  const head = document.querySelector('[data-studio-header]');
  if (!head) return;
  const button = head.querySelector('[data-studio-menu-toggle]');
  const nav = head.querySelector('[data-studio-nav]');
  if (!button || !nav) return;
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); button.focus(); }
  });
  document.addEventListener('click', e => {
    if (!head.contains(e.target)) close();
  });
  const breakpoint = window.matchMedia('(min-width:1191px)');
  if (breakpoint.addEventListener) breakpoint.addEventListener('change', close);
  else if (breakpoint.addListener) breakpoint.addListener(close);
  const path = window.location.pathname.replace(/\/index\.html?$/, '/').replace(/\/$/, '') || '/';
  const current = (() => {
    if (path === '/') return 'Home';
    if (path === '/plugins' || path.startsWith('/plugin/')) return 'Plugins';
    if (path === '/moodle-upgrades') return 'Upgrades';
    if (path === '/service/moodlemobile') return 'Mobile';
    if (path === '/service/moodle-hosting') return 'Pricing';
    if (path.startsWith('/case/')) return 'Cases';
    if (path.startsWith('/service/') || path === '/services') return 'Services';
    return null;
  })();
  head.querySelectorAll('[data-site-menu]').forEach(a => {
    if (a.dataset.siteMenu === current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const privacy = document.querySelector('[data-open-privacy]');
  if (privacy && !document.querySelector('#privacy-dialog')) privacy.addEventListener('click', () => { window.location.href = '/#contato'; });
  const otherLanguage = head.querySelector('a[hreflang="pt-BR"]');
  if (otherLanguage) otherLanguage.href = 'https://eadsuporte.com.br' + (path === '/' ? '/' : path + '/');
  const back = document.querySelector('[data-studio-back-top]');
  if (back && path !== '/') back.setAttribute('href', '/');
})();
