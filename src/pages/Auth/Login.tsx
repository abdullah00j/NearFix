import { useState } from "react";
import ImageSection from "../../components/Auth/ImageSection";
import AuthSection from "../../components/Auth/AuthSection";
import PhoneOtpModal from "../../components/Auth/PhoneOtpModal";
const Login = () => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  return (
    <main className="min-h-screen  font-sans text-text md:h-screen md:overflow-hidden">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* ===================================================== LEFT IMAGE ====================================================== */}

        <ImageSection />

        {/* ===================================================== RIGHT AUTH ====================================================== */}
        <AuthSection setShowPhonePopup={setShowPhonePopup} />
      </div>
      {/* ===================================================== PHONE / OTP MODAL ====================================================== */}
      <PhoneOtpModal
        showPhonePopup={showPhonePopup}
        setShowPhonePopup={setShowPhonePopup}
      />
    </main>
  );
};
export default Login;
