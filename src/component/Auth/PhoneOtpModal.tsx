import { ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

type PhoneOtpModalProps = {
  showPhonePopup: boolean;
  setShowPhonePopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const PhoneOtpModal = ({ showPhonePopup, setShowPhonePopup }: PhoneOtpModalProps) => {


  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const closePopup = () => {
    setShowPhonePopup(false);
    setShowOtp(false);
    setPhone("");
    setOtp("");
  };
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    setShowOtp(true);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit security code");
      return;
    }
    alert("Code verified successfully!");
  };

  return (
    <>
      {showPhonePopup && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-[5px] ">
          <div className=" relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] ">
            {/* Close */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close"
              className=" absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 "
            >
              <X size={16} />
            </button>
            <div className="px-7 py-8 sm:px-8">
              {!showOtp ? (
                <>
                  {/* Icon */}
                  <div className="mb-6 grid h-11 w-11 place-items-center rounded-[10px_10px_10px_3px] bg-primary text-lg font-bold text-white">
                    N
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-dark">
                    Phone verification
                  </span>
                  <h2 className="mt-2 text-[30px] font-semibold leading-[1] tracking-[-0.045em] text-slate-900">
                    Enter your <br />
                    <span className="text-primary"> phone number. </span>
                  </h2>
                  <p className="mt-4 text-[13px] leading-5 text-slate-500">
                    We'll send a one-time security code to verify your number.
                  </p>
                  <form onSubmit={handlePhoneSubmit} className="mt-7">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoFocus
                      className=" h-12 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 "
                    />
                    <button
                      type="submit"
                      className=" mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-[13px] font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99] "
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </form>
                  <p className="mt-5 text-center text-[10px] leading-5 text-slate-400">
                    Your number is only used for secure account verification.
                  </p>
                </>
              ) : (
                <>
                  {/* Icon */}
                  <div className="mb-6 grid h-11 w-11 place-items-center rounded-[10px] bg-primary text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-dark">
                    Verify your number
                  </span>
                  <h2 className="mt-2 text-[30px] font-semibold leading-[1] tracking-[-0.045em] text-slate-900">
                    Enter the <br />
                    <span className="text-primary"> security code. </span>
                  </h2>
                  <p className="mt-4 text-[13px] leading-5 text-slate-500">
                    We sent a 6-digit code to
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-slate-800">
                    {phone}
                  </p>
                  {/* OTP */}
                  <div className="mt-7">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
                      Verification code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="000000"
                      value={otp}
                      autoFocus
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      className=" h-14 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-center text-[24px] font-bold tracking-[0.45em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 "
                    />
                    <button
                      type="button"
                      onClick={handleVerify}
                      className=" mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-[13px] font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99] "
                    >
                      Verify code <Check size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                  {/* Actions */}
                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      Didn't receive the code? Resend
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtp(false);
                        setOtp("");
                      }}
                      className="mt-3 block w-full text-[10px] text-slate-400 transition hover:text-slate-700"
                    >
                      Change phone number
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PhoneOtpModal;
