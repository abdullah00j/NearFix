import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";

type AuthSectionProps = {
  setShowPhonePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthSection = ({ setShowPhonePopup }: AuthSectionProps) => {
 
    return (
    <>
      <section className="relative flex min-h-screen flex-col bg-background">
        {/* Mobile brand */}
        <div className="absolute left-6 top-6 flex items-center gap-1 md:hidden">
         <div className="grid h-9 w-9 place-items-center ">
            <img src="/logo.png" alt="" />
          </div>
          <span className="text-[17px] font-bold tracking-[-0.02em] text-black">
            Near
            <span className="text-primary">Fix</span>
          </span>
        </div>
        {/* Auth content */}
        <div className="m-auto w-full max-w-[390px] px-6 py-24 sm:px-8 md:px-0">
          {/* Heading */}
          <div className="text-center font-sans">
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
              Welcome to Near
              <span className="text-primary">Fix</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Sign in to continue to your account
            </p>
          </div>
          {/* Auth methods */}
          <div className="mt-9">
            {/* Google */}
            <Button className="cursor-pointer">
              <img src="/google.svg.webp" alt="" className="size-7" />
              <span>Continue with Google</span>
            </Button>
            {/* Divider */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                or
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            {/* Phone */}
            <button
              type="button"
              onClick={() => setShowPhonePopup(true)}
              className=" group cursor-pointer flex h-12 w-full items-center justify-between rounded-[10px] bg-primary px-4 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(15,118,110,0.18)] transition-all duration-200 hover:bg-primary-dark hover:shadow-[0_8px_20px_rgba(15,118,110,0.22)] active:scale-[0.99] "
            >
              <span className="flex-1 text-center">
                Continue with phone number
              </span>
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck size={13} /> Secure authentication
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between px-6 pb-6 text-[10px] text-slate-400 sm:px-8 md:px-10">
          <span>© 2026 NearFix</span>
          <div className="flex items-center gap-5">
            <button className="transition hover:text-slate-700">
              Help center
            </button>
            <button className="transition hover:text-slate-700">Privacy</button>
          </div>
        </footer>
      </section>
    </>
  );
};

export default AuthSection;
