import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#071b13]">

      {/* HERO SECTION */}
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          rounded-b-[30px]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/images/reptile-hero.jpg')",
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Extra green cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061c13]/80 via-[#092b1d]/30 to-transparent" />

        {/* NAVBAR */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* HERO CONTENT */}
        <div
          className="
            relative
            z-10
            flex
            min-h-[calc(100vh-80px)]
            items-center
          "
        >
          <div
            className="
              w-full
              max-w-7xl
              mx-auto
              px-6
              sm:px-10
              lg:px-16

              pt-36
              sm:pt-40
              md:pt-44
              lg:pt-48

              pb-32
              sm:pb-36
              lg:pb-40
            "
          >

            {/* Small heading */}
            <p
              className="
                mb-2
                text-lg
                font-light
                tracking-wide
                text-white/80
                sm:text-xl
                lg:text-2xl
              "
            >
              Fantastic
            </p>

            {/* Main heading */}
            <h1
              className="
                max-w-3xl
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Reptiles World
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-white/75
                sm:text-base
              "
            >
              A magical world of reptiles awaits you. Discover fascinating
              creatures, explore their natural habitats and experience the
              beauty of nature like never before.
            </p>

            {/* Discover button */}
            <button
              className="
                mt-7
                rounded-sm
                border
                border-emerald-400/70
                bg-emerald-500/10
                px-8
                py-3
                text-sm
                font-medium
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-emerald-500
                hover:border-emerald-500
                hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]
              "
            >
              Discover
            </button>

          </div>
        </div>

        {/* BOTTOM STAT / RATING BOXES */}
        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-20
            w-[calc(100%-32px)]
            max-w-4xl
            -translate-x-1/2
          "
        >
          <div
            className="
              grid
              grid-cols-3
              overflow-hidden
              rounded-xl
              border
              border-white/15
              bg-[#10261d]/75
              shadow-2xl
              backdrop-blur-xl
            "
          >

            {/* BOX 1 */}
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                border-r
                border-white/10
                px-3
                py-4
                text-center
                sm:py-5
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-lg text-emerald-400">★</span>
                <span className="text-lg font-semibold text-white sm:text-xl">
                  4.9/5
                </span>
              </div>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                User Rating
              </p>
            </div>

            {/* BOX 2 */}
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                border-r
                border-white/10
                px-3
                py-4
                text-center
                sm:py-5
              "
            >
              <span className="text-lg font-semibold text-white sm:text-xl">
                10K+
              </span>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                Happy Users
              </p>
            </div>

            {/* BOX 3 */}
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                px-3
                py-4
                text-center
                sm:py-5
              "
            >
              <span className="text-lg font-semibold text-white sm:text-xl">
                98%
              </span>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                Satisfaction
              </p>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-32
            bg-gradient-to-t
            from-[#071b13]
            to-transparent
            pointer-events-none
          "
        />

      </section>

    </div>
  );
};

export default Home;