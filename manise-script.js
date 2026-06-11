/* =========================================================
   Manise — Script Interaktif
   Layout dasar: TemplateMo 613 Frost Bakery (ditulis ulang)
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Menu Hamburger (Mobile) ---------- */
    var hamburger = document.getElementById('hamburger');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-visible');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        if (sidebar.classList.contains('is-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    /* Tutup sidebar saat salah satu menu diklik (mobile) */
    var navLinks = document.querySelectorAll('.sidebar__nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });

    /* ---------- Animasi Reveal saat Scroll ---------- */
    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      /* Fallback: langsung tampilkan */
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Highlight Menu Aktif saat Scroll ---------- */
    var sections = document.querySelectorAll('main section[id]');
    var menuItems = document.querySelectorAll('.sidebar__nav a');

    function setActiveLink(id) {
      menuItems.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    if ('IntersectionObserver' in window && sections.length) {
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      }, { threshold: 0.5, rootMargin: '-20% 0px -55% 0px' });

      sections.forEach(function (sec) { spyObserver.observe(sec); });
    }

    /* ---------- Tab Musiman ---------- */
    var tabs = document.querySelectorAll('.seasonal-tab');
    var panels = document.querySelectorAll('.seasonal-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var season = tab.getAttribute('data-season');

        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          panel.classList.toggle('is-active', panel.id === 'panel-' + season);
        });
      });
    });

  });
})();
