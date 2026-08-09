/* I SMILE — FINAL SITE INTERACTIONS */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.header');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var heroVideo = document.getElementById('heroVideo');

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */
    if (navToggle && navMenu) {
        var icon = navToggle.querySelector('i');

        function setMenu(open) {
            if (open) {
                navMenu.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.setAttribute('aria-label', 'Fermer le menu');
                document.body.classList.add('menu-open');

                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            } else {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Ouvrir le menu');
                document.body.classList.remove('menu-open');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }

        navToggle.setAttribute('type', 'button');

        navToggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            setMenu(!navMenu.classList.contains('active'));
        });

        var links = navMenu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                setMenu(false);
            });
        }

        document.addEventListener('click', function (event) {
            if (!navMenu.classList.contains('active')) return;

            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                setMenu(false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                setMenu(false);
                navToggle.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 800) {
                setMenu(false);
            }
        });

        setMenu(false);
    }

    /* =====================================================
       HEADER SCROLL STATE
       ===================================================== */
    if (header) {
        function updateHeader() {
            if (window.scrollY > 24) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    /* =====================================================
       SAME-PAGE ANCHORS
       ===================================================== */
    var anchors = document.querySelectorAll('a[href^="#"]');

    for (var a = 0; a < anchors.length; a++) {
        anchors[a].addEventListener('click', function (event) {
            var selector = this.getAttribute('href');

            if (!selector || selector === '#') return;

            var target = document.querySelector(selector);
            if (!target) return;

            event.preventDefault();

            var offset = header ? header.offsetHeight + 10 : 10;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'smooth'
            });
        });
    }

    /* =====================================================
       HERO VIDEO — AUTOPLAY, NO PLAY BUTTON
       ===================================================== */
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.playsInline = true;

        function playHero() {
            var promise = heroVideo.play();

            if (promise && typeof promise.catch === 'function') {
                promise.catch(function () {});
            }
        }

        playHero();

        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                playHero();
            }
        });
    }

    /* =====================================================
       NON-HERO VIDEOS — PLAY BUTTON
       ===================================================== */
    var videos = document.querySelectorAll('.service-video video');

    for (var v = 0; v < videos.length; v++) {
        (function (video) {
            var wrapper = video.closest('.service-video');

            if (!wrapper || wrapper.querySelector('.video-play-badge')) return;

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'video-play-badge';
            button.setAttribute('aria-label', 'Lire la vidéo');
            button.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';

            wrapper.appendChild(button);

            function sync() {
                var playing = !video.paused && !video.ended;

                button.classList.toggle('is-playing', playing);
                button.setAttribute(
                    'aria-label',
                    playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'
                );

                button.innerHTML = playing
                    ? '<i class="fas fa-pause" aria-hidden="true"></i>'
                    : '<i class="fas fa-play" aria-hidden="true"></i>';
            }

            button.addEventListener('click', function () {
                if (video.paused) {
                    var promise = video.play();

                    if (promise && typeof promise.catch === 'function') {
                        promise.catch(function () {});
                    }
                } else {
                    video.pause();
                }
            });

            video.addEventListener('play', sync);
            video.addEventListener('pause', sync);
            video.addEventListener('ended', sync);

            sync();
        })(videos[v]);
    }

    /* External links */
    var externalLinks = document.querySelectorAll('a[target="_blank"]');

    for (var e = 0; e < externalLinks.length; e++) {
        externalLinks[e].rel = 'noopener noreferrer';
    }
});

