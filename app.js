/* ============================================================
   TEODOR STOYANOV — portfolio
   ============================================================ */
"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============ dark mode toggle ============ */
(function themeToggle() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const current = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ============ role typer ============ */
(function typer() {
  const el = document.getElementById("typer");
  const roles = [
    "running the CS++ servers.",
    "self-hosting on Hetzner.",
    "shipping games for the society.",
    "learning AI & ML.",
  ];
  if (reducedMotion) { el.textContent = roles[0]; return; }

  let ri = 0, ci = 0, deleting = false;
  (function tick() {
    const word = roles[ri];
    el.textContent = word.slice(0, ci);
    let delay;
    if (!deleting) {
      ci++;
      delay = 65 + Math.random() * 50;
      if (ci > word.length) { deleting = true; delay = 2100; }
    } else {
      ci--;
      delay = 30;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 420; }
    }
    setTimeout(tick, delay);
  })();
})();

/* ============ scroll reveal ============ */
(function scrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

/* ============================================================
   OPTIONAL EFFECTS — numbered to match styles.css / index.html;
   delete a block to remove the effect
   ============================================================ */

/* EFFECT 1: scroll progress bar */
(function progressBar() {
  const bar = document.getElementById("progress");
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* EFFECT 2: section rail — guitar strings, strictly silent.
   The string for the topic in view glows mint and gets a visual
   pluck wobble when it becomes active. No audio, ever. */
(function sectionRail() {
  const dots = [...document.querySelectorAll(".rail a")];
  if (!dots.length) return;

  function pluck(link) {
    if (reducedMotion) return;
    link.classList.remove("plucked");
    void link.offsetWidth; // restart the animation
    link.classList.add("plucked");
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      dots.forEach((d) => {
        const isActive = d.getAttribute("href") === `#${entry.target.id}`;
        if (isActive && !d.classList.contains("active")) pluck(d);
        d.classList.toggle("active", isActive);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  dots.forEach((d) => {
    const target = document.querySelector(d.getAttribute("href"));
    if (target) io.observe(target);
    d.addEventListener("click", () => pluck(d));
  });
})();

/* EFFECT 5: gentle tilt + glow on project cards */
(function tiltCards() {
  if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const pxr = (e.clientX - r.left) / r.width;
      const pyr = (e.clientY - r.top) / r.height;
      const k = Math.min(1, 380 / r.width); // wide cards tilt less
      card.style.transform =
        `perspective(800px) rotateY(${(pxr - 0.5) * 6 * k}deg) rotateX(${(0.5 - pyr) * 5 * k}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${pxr * 100}%`);
      card.style.setProperty("--my", `${pyr * 100}%`);
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
})();

/* EFFECT 6: magnetic buttons */
(function magneticButtons() {
  if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.18, -7, 7);
      const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.3, -5, 5);
      btn.style.transform = `translate(${dx}px, ${dy - 2}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });
})();

/* EFFECT 8: section titles decode themselves on first reveal */
(function decodeTitles() {
  if (reducedMotion) return;
  const CHARS = "abcdefghijklmnopqrstuvwxyz<>/#{}*";
  function decode(el) {
    const original = el.textContent;
    let frame = 0;
    (function tick() {
      let out = "";
      let settled = true;
      for (let i = 0; i < original.length; i++) {
        const ch = original[i];
        if (ch === " " || frame > i * 1.6 + 5) { out += ch; }
        else { out += CHARS[Math.floor(Math.random() * CHARS.length)]; settled = false; }
      }
      el.textContent = out;
      frame++;
      if (!settled) requestAnimationFrame(tick);
    })();
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.decoded) return;
      entry.target.dataset.decoded = "1";
      decode(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".section__title").forEach((el) => io.observe(el));
})();

/* EFFECT 11: interactive whoami terminal — fun catches included */
(function terminal() {
  const out = document.getElementById("termOut");
  const input = document.getElementById("termInput");
  const screen = document.getElementById("termScreen");
  const form = document.getElementById("termForm");
  if (!out) return;

  function write(text, cls = "") {
    const div = document.createElement("div");
    div.className = "t-line" + (cls ? ` ${cls}` : "");
    div.textContent = text;
    out.appendChild(div);
    while (out.children.length > 150) out.firstChild.remove();
    screen.scrollTop = screen.scrollHeight;
  }
  function writeCmd(cmd) {
    const div = document.createElement("div");
    div.className = "t-line";
    const p = document.createElement("span");
    p.className = "t-prompt";
    p.textContent = "$ ";
    div.appendChild(p);
    div.appendChild(document.createTextNode(cmd));
    out.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
  }

  const SECTIONS = {
    intro: "intro", home: "intro",
    projects: "projects", experience: "experience",
    skills: "skills",
    reviews: "reviews", contact: "contact",
  };
  function goto(name) {
    const el = document.getElementById(SECTIONS[name]);
    write(`→ taking you to ${name}…`, "t-muted");
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }

  const CMDS = {
    help() {
      write("commands: whoami · jumpflip · homelab · projects · experience · skills · reviews · contact · coffee · ls · clear", "t-accent");
      write("…and a few undocumented ones. poke around.", "t-muted");
    },
    whoami() {
      write("teodor stoyanov — cs student @ tu dublin · systems & self-hosting");
      write("likes building things people actually use. also plays guitar.", "t-muted");
    },
    jumpflip() {
      write("jumpflip: recruitment game for the CS++ society — 90+ students, 1,500+ games.");
      write("scores are replayed server-side, so they can't be faked. play it: flappy.cspp.ie", "t-muted");
    },
    homelab() {
      write("homelab-stack: Ubuntu 24.04 on Hetzner — Docker Compose behind Nginx + Let's Encrypt.");
      write("UFW + Fail2ban on guard. survived a memory outage. still up. ✅", "t-muted");
    },
    skills() { goto("skills"); },
    projects() { goto("projects"); },
    experience() { goto("experience"); },
    reviews() { goto("reviews"); },
    contact() { goto("contact"); },
    coffee() {
      write("brewing… ░▒▓█", "t-muted");
      setTimeout(() => write("☕ ready. productivity +20%, jitters +40%."), 800);
    },
    ls() { write("projects/  experience/  skills/  reviews/  secrets/"); },
    pwd() { write("/home/teodor/portfolio"); },
    clear() { out.innerHTML = ""; },
    date() { write(new Date().toString()); },
    exit() { write("you can check out any time you like, but you can never leave. 🎶", "t-muted"); },
    quit() { CMDS.exit(); },
    vim() { write("vim opened. that's it. this is your life now. (try 'exit')", "t-muted"); },
    hello() { write("hey! type 'help' to look around."); },
    hi() { CMDS.hello(); },
    hey() { CMDS.hello(); },
  };

  function run(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    writeCmd(trimmed);
    const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    if (cmd === "sudo") { write("nice try. this incident will be reported… to the CS++ committee.", "t-accent"); return; }
    if (cmd === "rm" && arg.includes("-rf")) { write("absolutely not. that server took me weeks.", "t-accent"); return; }
    if ((cmd === "cd" || cmd === "cat" || cmd === "open") && arg) {
      const key = arg.replace(/\/$/, "");
      if (key === "secrets") { write(`${cmd}: secrets: permission denied — buy me a coffee first.`, "t-muted"); return; }
      if (SECTIONS[key]) { goto(key); return; }
      write(`${cmd}: ${arg}: no such file or directory (it's a metaphor)`, "t-muted");
      return;
    }
    if (CMDS[cmd]) { CMDS[cmd](arg); return; }
    write(`command not found: ${cmd} — try 'help'`, "t-muted");
  }

  /* history with arrow keys */
  const history = [];
  let hIdx = -1;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    if (v.trim()) { history.unshift(v); hIdx = -1; }
    run(v);
    input.value = "";
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx > 0) { hIdx--; input.value = history[hIdx]; }
      else { hIdx = -1; input.value = ""; }
    }
  });
  screen.addEventListener("click", () => input.focus({ preventScroll: true }));

  /* auto-typed intro */
  const INTRO = "whoami";
  function printIntroResult() {
    write("teodor stoyanov — cs student @ tu dublin · systems & self-hosting");
    write("type 'help' to poke around ▸", "t-muted");
  }
  if (reducedMotion) {
    writeCmd(INTRO);
    printIntroResult();
  } else {
    const line = document.createElement("div");
    line.className = "t-line";
    const p = document.createElement("span");
    p.className = "t-prompt";
    p.textContent = "$ ";
    line.appendChild(p);
    const txt = document.createTextNode("");
    line.appendChild(txt);
    out.appendChild(line);
    let i = 0;
    setTimeout(function type() {
      if (i < INTRO.length) {
        txt.textContent += INTRO[i++];
        setTimeout(type, 95);
      } else {
        setTimeout(printIntroResult, 300);
      }
    }, 600);
  }
})();
