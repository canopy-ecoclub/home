/* ==========================================================================
   CANOPY — main.js
   Sections: 1) intro logo moment  2) navbar  3) scroll reveals + parallax
             4) hero particles  5) countdown  6) CTA micro-interactions
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------ */
  /* 1. OPENING / LOGO MOMENT                                           */
  /* ------------------------------------------------------------------ */
  (function intro() {
    var overlay = document.getElementById("intro-overlay");
    var skipBtn = document.getElementById("introSkip");
    var tagline = document.getElementById("introTagline");
    var draw = document.getElementById("introDraw");
    var fill = document.getElementById("introFill");
    if (!overlay) return;

    var dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      overlay.classList.add("is-hidden");
      setTimeout(function () { overlay.style.display = "none"; }, 700);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    }
    function onScroll() { dismiss(); }

    if (reduceMotion) {
      // Show mark briefly without motion, then get out of the way fast.
      setTimeout(dismiss, 500);
    } else {
      if (hasGSAP) {
        var tl = gsap.timeline({ onComplete: function () { setTimeout(dismiss, 500); } });
        tl.to(draw.querySelectorAll(".tree-path"), {
          strokeDashoffset: 0, duration: 1.1, ease: "power2.out", stagger: 0.08
        })
        .to(fill, { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(tagline, { opacity: 1, duration: 0.5 }, "-=0.1")
        .to(skipBtn, { opacity: 1, duration: 0.4 }, "-=0.3");
      } else {
        // no-GSAP fallback: simple CSS fade
        draw.querySelectorAll(".tree-path").forEach(function (p) { p.style.transition = "stroke-dashoffset 1.1s ease"; p.style.strokeDashoffset = 0; });
        setTimeout(function () {
          fill.style.transition = "opacity .4s"; fill.style.opacity = 1;
          tagline.style.transition = "opacity .4s"; tagline.style.opacity = 1;
          skipBtn.style.transition = "opacity .4s"; skipBtn.style.opacity = 1;
        }, 900);
        setTimeout(dismiss, 1900);
      }
    }

    skipBtn.addEventListener("click", dismiss);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    // hard safety net — never block the page
    setTimeout(dismiss, 4000);
  })();

  /* ------------------------------------------------------------------ */
  /* 2. NAVBAR — reveal after intro, glass on scroll, mobile menu        */
  /* ------------------------------------------------------------------ */
  (function nav() {
    var navbar = document.getElementById("navbar");
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");

    setTimeout(function () { navbar.classList.add("is-visible"); }, reduceMotion ? 300 : 1700);

    function onScroll() {
      navbar.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 3. SCROLL REVEALS — IntersectionObserver drives .is-visible;       */
  /*    GSAP (if present) adds staggered per-section choreography.      */
  /* ------------------------------------------------------------------ */
  (function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseFloat(el.dataset.delay || 0);
          setTimeout(function () { el.classList.add("is-visible"); }, delay * 1000);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // vary delay per section so groups don't fade in identically
    document.querySelectorAll(".about-grid, .dig-top, .dig-grid, .bento").forEach(function (group) {
      Array.prototype.forEach.call(group.querySelectorAll(".reveal"), function (el, i) {
        el.dataset.delay = (i * 0.08).toFixed(2);
      });
    });
  })();

  /* ------------------------------------------------------------------ */
  /* Hero title kinetic entrance + parallax layers (GSAP + ScrollTrigger)*/
  /* ------------------------------------------------------------------ */
  (function heroMotion() {
    if (reduceMotion) return;

    if (hasGSAP) {
      gsap.set(".hero-title .line span", { yPercent: 120, opacity: 0 });
      gsap.to(".hero-title .line span", {
        yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        stagger: 0.12, delay: reduceMotion ? 0.2 : 1.9
      });
      gsap.to([".hero-sub", ".hero-meta", ".scroll-cue"], {
        opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 2.4, stagger: 0.1
      });
      gsap.set([".hero-sub", ".hero-meta", ".scroll-cue"], { opacity: 0, y: 18 });

      // parallax leaves + about image, via ScrollTrigger, 3D-transform based
      document.querySelectorAll(".hero-leaf").forEach(function (leaf) {
        var depth = parseFloat(leaf.dataset.depth || 0.2);
        gsap.to(leaf, {
          yPercent: 60 * depth * -1,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
      });
      var aboutImg = document.querySelector('[data-parallax-img] img');
      if (aboutImg) {
        gsap.to(aboutImg, {
          yPercent: -8, ease: "none",
          scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    } else {
      document.querySelectorAll(".hero-title .line span").forEach(function (s) { s.style.opacity = 1; });
    }
  })();

  /* ------------------------------------------------------------------ */
  /* 4. HERO PARTICLES — soft drifting dust/pollen, GPU-friendly         */
  /* ------------------------------------------------------------------ */
  (function particles() {
    var field = document.getElementById("particles");
    if (!field || reduceMotion) return;
    var count = window.innerWidth < 700 ? 10 : 22;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("div");
      p.className = "particle";
      var size = 3 + Math.random() * 4;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      field.appendChild(p);
      if (hasGSAP) {
        gsap.to(p, {
          y: -60 - Math.random() * 80,
          x: (Math.random() - 0.5) * 60,
          duration: 8 + Math.random() * 10,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 6
        });
      }
    }
  })();

  /* ------------------------------------------------------------------ */
  /* 5. COUNTDOWN — flip-digit animation toward 10 Jul 2026, 09:00       */
  /* ------------------------------------------------------------------ */
  (function countdown() {
    var target = new Date("2026-07-10T09:00:00+05:30").getTime();
    var wrap = document.getElementById("countdown");
    var doneMsg = document.getElementById("countdownDone");
    if (!wrap) return;

    var unitEls = {
      days: wrap.querySelector('[data-unit="days"]'),
      hours: wrap.querySelector('[data-unit="hours"]'),
      minutes: wrap.querySelector('[data-unit="minutes"]'),
      seconds: wrap.querySelector('[data-unit="seconds"]')
    };
    var lastVals = { days: null, hours: null, minutes: null, seconds: null };

    function setUnit(unitEl, value, key) {
      var str = String(Math.max(0, value)).padStart(2, "0");
      if (lastVals[key] === str) return;
      lastVals[key] = str;
      var cards = unitEl.querySelectorAll(".flip-card .digit");
      cards.forEach(function (digitEl, i) {
        var newDigit = str[i];
        if (digitEl.textContent === newDigit) return;
        if (reduceMotion || !hasGSAP) {
          digitEl.textContent = newDigit;
        } else {
          gsap.to(digitEl, {
            yPercent: -110, duration: 0.25, ease: "power1.in",
            onComplete: function () {
              digitEl.textContent = newDigit;
              gsap.fromTo(digitEl, { yPercent: 110 }, { yPercent: 0, duration: 0.3, ease: "power2.out" });
            }
          });
        }
      });
    }

    function tick() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        wrap.style.display = "none";
        doneMsg.style.display = "block";
        clearInterval(interval);
        return;
      }

      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);

      setUnit(unitEls.days, d, "days");
      setUnit(unitEls.hours, h, "hours");
      setUnit(unitEls.minutes, m, "minutes");
      setUnit(unitEls.seconds, s, "seconds");
    }

    tick();
    var interval = setInterval(tick, 1000);
  })();

  /* ------------------------------------------------------------------ */
  /* 6. CTA MICRO-INTERACTIONS — cursor-follow glow, mobile sticky CTA   */
  /* ------------------------------------------------------------------ */
  (function ctaFx() {
    var btn = document.getElementById("registerBtn");
    var glow = document.getElementById("ctaGlow");
    if (btn && glow && !reduceMotion) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left - 80) + "px";
        glow.style.top = (e.clientY - rect.top - 80) + "px";
      });
    }

    var stickyCta = document.getElementById("mobileCta");
    var hero = document.getElementById("hero");
    var registerSection = document.getElementById("register");
    if (stickyCta && hero) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === hero) {
            stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
          }
        });
      }, { threshold: 0 });
      io.observe(hero);

      // hide again once the real register button is on screen
      if (registerSection) {
        var io2 = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) stickyCta.classList.remove("is-visible");
          });
        }, { threshold: 0.3 });
        io2.observe(registerSection);
      }
    }
  })();

  /* ------------------------------------------------------------------ */
  /* Dignitary card hover-tilt (desktop only, GPU transform)             */
  /* ------------------------------------------------------------------ */
  (function tilt() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".dig-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "translateY(-8px) rotateX(" + (y * -6) + "deg) rotateY(" + (x * 6) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  })();

})();
