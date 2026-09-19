import { useEffect, useRef, useState } from "react";

const ImageSection = () => {
  const slides = [
    {
      image: "/images.jpg",
      alt: "NearFix plumber repairing a bathroom",
      label: "Plumbing, simplified",
      title: "Your home.",
      accent: "Taken care of.",
      description:
        "Find trusted professionals for repairs, maintenance, and everyday jobs around your home.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85",
      alt: "Professional using a drill for a home repair",
      label: "Repairs, handled",
      title: "Small fixes.",
      accent: "Big relief.",
      description:
        "From quick repairs to careful installations, get help from people who know their craft.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85",
      alt: "Home repair tools ready for a service visit",
      label: "Ready when you are",
      title: "Make room for",
      accent: "better days.",
      description:
        "Book reliable local help and spend your time on the things that matter more.",
    },
  ];
  const [slideProgress, setSlideProgress] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const progressRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];

  useEffect(() => {
    if (isCarouselPaused) return;

    const slideDuration = 3000;
    const startedAt =
      performance.now() - (progressRef.current / 100) * slideDuration;
    let animationFrame = 0;

    const animateProgress = (timestamp: number) => {
      const nextProgress = Math.min(
        ((timestamp - startedAt) / slideDuration) * 100,
        100,
      );
      progressRef.current = nextProgress;
      setSlideProgress(nextProgress);

      if (nextProgress >= 100) {
        progressRef.current = 0;
        setSlideProgress(0);
        setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
        return;
      }

      animationFrame = window.requestAnimationFrame(animateProgress);
    };

    animationFrame = window.requestAnimationFrame(animateProgress);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeSlide, isCarouselPaused, slides.length]);

  return (
    <>
      <section
        className="relative hidden h-screen overflow-hidden  p-1.5 md:block"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        <img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.alt}
          className="absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] rounded-xl object-cover shadow-[0_14px_35px_rgba(15,23,42,0.14)] transition-opacity duration-500"
        />

        {/* Clean overlay */}
        <div className="absolute inset-1.5 rounded-xl bg-slate-950/35" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-1.5 bottom-1.5 h-[58%] rounded-b-xl bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />

        {/* Brand */}
        <div className="absolute left-8 top-8 flex items-center gap-1">
          <div className="grid h-9 w-9 place-items-center ">
            <img src="/logo.png" alt="" />
          </div>
          <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
            Near
            <span className="text-primary-light">Fix</span>
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-10 left-8 right-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {currentSlide.label}
            </span>
          </div>
          <h1 className="max-w-[560px] text-[clamp(42px,4.2vw,64px)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
            {currentSlide.title} <br />
            <span className="text-primary-light"> {currentSlide.accent} </span>
          </h1>
          <p className="mt-5 max-w-[410px] text-[13px] leading-6 text-white/65">
            {currentSlide.description}
          </p>
          {/* Features */}

          <div className="flex justify-between ">
            <div
              className="mt-7 flex min-w-[250px] gap-1.5"
              aria-label="Image carousel progress"
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  onClick={() => {
                    setActiveSlide(index);
                    progressRef.current = 0;
                    setSlideProgress(0);
                  }}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
                >
                  <span
                    className={`block h-full rounded-full ${index < activeSlide ? "w-full bg-white" : index === activeSlide ? "bg-white" : "w-0"}`}
                    style={
                      index === activeSlide
                        ? { width: `${slideProgress}%` }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>

            {/* Small brand mark */}
            <div className="mt-5  text-white  text-[9px] font-semibold tracking-[0.18em]">
              NEAR
              <span className="text-primary-light">FIX</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageSection;
