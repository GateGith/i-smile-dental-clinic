/* I SMILE — SITE INTERACTIONS */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const heroVideo = document.getElementById('heroVideo');

  /* Mobile navigation */
  if (navToggle && navMenu) {
    const icon = navToggle.querySelector('i');

    const setMenu = (open) => {
      navMenu.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('menu-open', open);

      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    };

    navToggle.addEventListener('click', (event) => {
      event.preventDefault();
      setMenu(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('active')) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) setMenu(false);
    });
  }

  /* Header state */
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('header-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* Same-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 10 : 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });

  /* Hero video: silent autoplay only; no play overlay */
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    const playHero = () => {
      const promise = heroVideo.play();
      if (promise?.catch) promise.catch(() => {});
    };

    playHero();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) playHero();
    });
  }

  /* Non-hero videos: explicit premium play control */
  document.querySelectorAll('.service-video video').forEach((video) => {
    const wrapper = video.closest('.service-video');
    if (!wrapper || wrapper.querySelector('.video-play-badge')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play-badge';
    button.setAttribute('aria-label', 'Lire la vidéo');
    button.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
    wrapper.appendChild(button);

    const sync = () => {
      const playing = !video.paused && !video.ended;
      button.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo');
      button.innerHTML = playing
        ? '<i class="fas fa-pause" aria-hidden="true"></i>'
        : '<i class="fas fa-play" aria-hidden="true"></i>';
    };

    button.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('ended', sync);
    sync();
  });

  /* External links */
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = 'noopener noreferrer';
  });
});
/* I SMILE — SITE INTERACTIONS */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const heroVideo = document.getElementById('heroVideo');

  /* Mobile navigation */
  if (navToggle && navMenu) {
    const icon = navToggle.querySelector('i');

    const setMenu = (open) => {
      navMenu.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('menu-open', open);

      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    };

    navToggle.addEventListener('click', (event) => {
      event.preventDefault();
      setMenu(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('active')) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) setMenu(false);
    });
  }

  /* Header state */
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('header-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* Same-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 10 : 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });

  /* Hero video: silent autoplay only; no play overlay */
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    const playHero = () => {
      const promise = heroVideo.play();
      if (promise?.catch) promise.catch(() => {});
    };

    playHero();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) playHero();
    });
  }

  /* Non-hero videos: explicit premium play control */
  document.querySelectorAll('.service-video video').forEach((video) => {
    const wrapper = video.closest('.service-video');
    if (!wrapper || wrapper.querySelector('.video-play-badge')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play-badge';
    button.setAttribute('aria-label', 'Lire la vidéo');
    button.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
    wrapper.appendChild(button);

    const sync = () => {
      const playing = !video.paused && !video.ended;
      button.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo');
      button.innerHTML = playing
        ? '<i class="fas fa-pause" aria-hidden="true"></i>'
        : '<i class="fas fa-play" aria-hidden="true"></i>';
    };

    button.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('ended', sync);
    sync();
  });

  /* External links */
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = 'noopener noreferrer';
  });
});
