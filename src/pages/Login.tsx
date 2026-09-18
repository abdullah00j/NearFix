
import { useState } from "react";
import Button from "../component/Button";

const Login = () => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // Phone number submit
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.trim() === "") {
      alert("Please enter your phone number");
      return;
    }

    // After phone number submit, show OTP
    setShowOtp(true);
  };

  // OTP verification
  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit security code");
      return;
    }

    alert("Code verified successfully!");
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side - Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">

        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold text-center pb-2">
            Welcome to
          </h1>

          <h2 className="text-5xl font-bold text-center text-[#FF9D23] pb-4">
            NearFix
          </h2>

          <p className="mt-2 text-gray-500">
            Login to your account
          </p>

          <form className="mt-8 space-y-5">

            {/* Google Button */}
            <Button>
              Login with Google
            </Button>

            {/* Phone Button */}
            <button
              type="button"
              onClick={() => setShowPhonePopup(true)}
              className="w-full rounded-lg bg-[#FF9D23] py-3 font-medium text-white hover:bg-gray-800 transition"
            >
              Continue with Phone Number
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span className="font-medium text-black cursor-pointer hover:underline">
              Sign up
            </span>
          </p>

        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images.jpg"
          alt="Near Fix"
          className="h-full w-full object-cover max-h-screen rounded-3xl p-4"
        />
      </div>


      {/* Phone / OTP Popup */}
      {showPhonePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setShowPhonePopup(false);
                setShowOtp(false);
                setPhone("");
                setOtp("");
              }}
              className="absolute right-5 top-4 text-2xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>


            {!showOtp ? (
              /* ================= PHONE NUMBER SCREEN ================= */
              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Enter your phone number
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We'll send you a security code to verify your number.
                </p>

                <form
                  onSubmit={handlePhoneSubmit}
                  className="mt-6"
                >

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#FF9D23] focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-[#FF9D23] py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#f28c0c] hover:shadow-lg active:scale-[0.98]"
                  >
                    Continue
                  </button>

                </form>

              </div>

            ) : (

              /* ================= OTP SCREEN ================= */
              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Enter security code
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Enter the 6-digit code sent to
                </p>

                <p className="mt-1 font-semibold text-gray-700">
                  {phone}
                </p>


                {/* OTP Input */}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none transition focus:border-[#FF9D23] focus:ring-2 focus:ring-orange-100"
                />

                {/* Verify */}
                <button
                  type="button"
                  onClick={handleVerify}
                  className="mt-5 w-full rounded-xl bg-[#FF9D23] py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#f28c0c] hover:shadow-lg active:scale-[0.98]"
                >
                  Verify Code
                </button>

                {/* Resend */}
                <button
                  type="button"
                  className="mt-4 block w-full text-sm font-medium text-[#FF9D23] hover:underline"
                >
                  Resend code
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Login;

