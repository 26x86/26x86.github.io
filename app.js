(() => {
  const root = document.documentElement;
  const cursor = document.querySelector(".cursor");
  const canvas = document.getElementById("grid");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;

  const saved = localStorage.getItem("nc-theme");
  if (saved) root.setAttribute("data-theme", saved);
  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    localStorage.setItem("nc-theme", next === "dark" ? "" : "light");
  });

  if (fine && !reduce && cursor) {
    document.body.classList.add("has-cursor");
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let cx = x;
    let cy = y;
    addEventListener("pointermove", (event) => {
      x = event.clientX;
      y = event.clientY;
      const over = event.target.closest("a, button");
      cursor.classList.toggle("on-link", Boolean(over));
    });
    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      requestAnimationFrame(tick);
    };
    tick();
  } else if (cursor) {
    cursor.remove();
  }

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      if (reduce) return;
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  document.querySelectorAll(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      if (reduce) return;
      const box = el.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width - 0.5;
      const py = (event.clientY - box.top) / box.height - 0.5;
      el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(8px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  if (!canvas || reduce) {
    canvas?.remove();
    return;
  }

  const ctx = canvas.getContext("2d");
  const dots = Array.from({ length: 48 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00022,
    vy: (Math.random() - 0.5) * 0.00022,
  }));
  let mx = 0.5;
  let my = 0.5;
  addEventListener("pointermove", (event) => {
    mx = event.clientX / innerWidth;
    my = event.clientY / innerHeight;
  });

  const draw = () => {
    const w = (canvas.width = innerWidth * devicePixelRatio);
    const h = (canvas.height = innerHeight * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const pink = getComputedStyle(document.body).getPropertyValue("--pink").trim() || "#f41469";
    dots.forEach((dot) => {
      dot.x += dot.vx + (mx - 0.5) * 0.00005;
      dot.y += dot.vy + (my - 0.5) * 0.00005;
      if (dot.x < 0 || dot.x > 1) dot.vx *= -1;
      if (dot.y < 0 || dot.y > 1) dot.vy *= -1;
      dot.x = Math.min(1, Math.max(0, dot.x));
      dot.y = Math.min(1, Math.max(0, dot.y));
      ctx.beginPath();
      ctx.arc(dot.x * innerWidth, dot.y * innerHeight, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = pink;
      ctx.globalAlpha = 0.55;
      ctx.fill();
    });
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = pink;
    for (let i = 0; i < dots.length; i += 1) {
      for (let j = i + 1; j < dots.length; j += 1) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 0.16) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x * innerWidth, dots[i].y * innerHeight);
          ctx.lineTo(dots[j].x * innerWidth, dots[j].y * innerHeight);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };
  draw();
})();
