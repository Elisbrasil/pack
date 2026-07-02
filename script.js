(function () {
  const carousel = document.getElementById("carousel-templates");
  const track = carousel.querySelector(".carousel-track");
  const slides = track.querySelectorAll(".carousel-slide");
  const dotsWrap = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-arrow--prev");
  const nextBtn = carousel.querySelector(".carousel-arrow--next");

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () =>
      slides[i].scrollIntoView({ behavior: "smooth", inline: "center" }),
    );
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll(".dot");

  function scrollByOne(dir) {
    const w = slides[0].offsetWidth + 16;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = track.scrollLeft + dir * w;

    if (next >= maxScroll - 5) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: dir * w, behavior: "smooth" });
    }
  }
  prevBtn.addEventListener("click", () => scrollByOne(-1));
  nextBtn.addEventListener("click", () => scrollByOne(1));

  track.addEventListener("scroll", () => {
    let closest = 0,
      min = Infinity;
    slides.forEach((s, i) => {
      const diff = Math.abs(
        s.getBoundingClientRect().left - track.getBoundingClientRect().left,
      );
      if (diff < min) {
        min = diff;
        closest = i;
      }
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === closest));
  });

  // ---- AUTOPLAY ----
  let autoplayTimer = setInterval(() => scrollByOne(1), 3500); // troca a cada 3.5s

  function pauseAutoplay() {
    clearInterval(autoplayTimer);
  }
  function resumeAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => scrollByOne(1), 3500);
  }

  carousel.addEventListener("mouseenter", pauseAutoplay);
  carousel.addEventListener("mouseleave", resumeAutoplay);
  carousel.addEventListener("touchstart", pauseAutoplay, { passive: true });
  track.addEventListener("touchend", () => setTimeout(resumeAutoplay, 4000));
  prevBtn.addEventListener("click", resumeAutoplay);
  nextBtn.addEventListener("click", resumeAutoplay);
})();
