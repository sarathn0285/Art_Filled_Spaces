document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".sound-zone");

  zones.forEach(zone => {
    const audio = new Audio(zone.dataset.audio);
    audio.loop = true;
    audio.volume = 0.7;

    let ready = false;
    audio.addEventListener("canplaythrough", () => ready = true);

    zone.addEventListener("mouseenter", () => {
      if (!ready) return;
      audio.currentTime = 0;
      audio.play();
    });

    zone.addEventListener("mousemove", e => {
      if (!ready) return;

      if (zone.dataset.volume === "fixed") {
        audio.volume = 0.7;
        return;
      }

      const rect = zone.getBoundingClientRect();
      let volume = 0;

      if (zone.dataset.direction === "vertical") {
        const t = (e.clientY - rect.top) / rect.height;
        volume = zone.dataset.vertical === "tb" ? 1 - t : t;
      } else {
        const t = (e.clientX - rect.left) / rect.width;
        volume = zone.dataset.horizontal === "rl" ? 1 - t : t;
      }

      audio.volume = Math.max(0, Math.min(1, volume));
    });

    zone.addEventListener("mouseleave", () => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
    });
  });
});
