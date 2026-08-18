const canvas = document.getElementById("embers");
const motionOk = window.matchMedia(
  "(prefers-reduced-motion: no-preference)",
).matches;

if (canvas instanceof HTMLCanvasElement && motionOk) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const COUNT = 60;
    /** @type {{ x: number, y: number, vx: number, vy: number, r: number, a: number, life: number }[]} */
    const particles = [];
    let width = 0;
    let height = 0;

    function accent() {
      const light =
        document.documentElement.getAttribute("data-theme") === "light";
      return light
        ? { r: 168, g: 36, b: 36 }
        : { r: 233, g: 154, b: 154 };
    }

    function spawn(fromBottom) {
      const travel = Math.max(height * 0.5, 1);
      const life = fromBottom ? 0 : Math.random();
      return {
        x: Math.random() * width,
        y: height + 6 - travel * life,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.28 - Math.random() * 0.62,
        r: 0.55 + Math.random() * 1.85,
        a: 0.18 + Math.random() * 0.42,
        life,
      };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      const { r, g, b } = accent();

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += Math.abs(particle.vy) / Math.max(height * 0.5, 1);

        if (
          particle.y < -10 ||
          particle.x < -10 ||
          particle.x > width + 10 ||
          particle.life > 1
        ) {
          Object.assign(particle, spawn(true));
        }

        const alpha = particle.a * Math.sin(particle.life * Math.PI);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(tick);
    }

    resize();
    for (let i = 0; i < COUNT; i += 1) {
      particles.push(spawn(false));
    }
    window.addEventListener("resize", resize, { passive: true });
    requestAnimationFrame(tick);
  }
}

const stage = document.querySelector(".stage");
const seal = document.querySelector(".seal");

function replayIntro() {
  if (!motionOk || !(stage instanceof HTMLElement)) {
    return;
  }

  const targets = [...stage.querySelectorAll(".ring, .numerals, .glow, .blob")];

  for (const el of targets) {
    el.style.animation = "none";
  }
  void stage.offsetWidth;
  for (const el of targets) {
    el.style.animation = "";
  }
}

if (seal instanceof HTMLElement) {
  seal.addEventListener("click", replayIntro);
}
