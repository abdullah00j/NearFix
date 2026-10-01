const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#eceff1] flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.08)] overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[520px]">
          {/* Left Side */}
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-xl bg-[#0f766e] flex items-center justify-center">
                <span className="text-white text-xl font-bold">N</span>
              </div>

              <span className="text-xl font-semibold text-[#0f172a]">
                NearFix
              </span>
            </div>

            {/* Content */}
            <div>
              <p className="text-[#0f766e] font-semibold text-sm uppercase tracking-wider mb-3">
                Error 404
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0f172a] leading-none mb-6">
                Page not
                <br />
                found.
              </h1>

              <p className="text-[#64748b] text-base sm:text-lg max-w-md leading-relaxed mb-8">
                Sorry, the page you're looking for doesn't exist or may have
                been moved to another location.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-3 rounded-xl bg-[#0f766e] text-white font-medium
                  hover:bg-[#115e59] transition-all duration-200"
                >
                  Back to Home
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded-xl border border-[#e5edf0]
                  bg-white text-[#0f172a] font-medium
                  hover:bg-[#f7fafb] transition-all duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-[#f7fafb] flex items-center justify-center relative overflow-hidden">
            {/* Background circles */}
            <div className="absolute w-80 h-80 rounded-full border border-[#e5edf0]" />
            <div className="absolute w-60 h-60 rounded-full border border-[#e5edf0]" />
            <div className="absolute w-40 h-40 rounded-full border border-[#e5edf0]" />

            {/* 404 */}
            <div className="relative text-center">
              <span className="text-[130px] sm:text-[160px] lg:text-[190px] font-bold leading-none text-[#0f766e]/10">
                404
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0f766e] flex items-center justify-center shadow-lg">
                  <span className="text-white text-4xl sm:text-5xl font-bold">
                    ?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
