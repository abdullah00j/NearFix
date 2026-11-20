import { LogOut } from "lucide-react";
import { signOutCurrentUser } from "@/data/userServices";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOutCurrentUser();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <LogOut size={15} className="cursor-pointer" onClick={handleLogout} />
    </>
  );
}

export default Logout;
