import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import userStore from "../../store/UserStore";

const Navbar = () => {
  const router = useRouter();

  const logout = () => {
    userStore.logout();
    router.push("/login").then(() => {
      toast.warning("Logged out");
    });
  };

  return (
    <div className="fixed flex justify-between w-full h-16 bg-zinc-800 rounded-b-md shadow-sm">
      <div className="" />
      <button
        onClick={() => logout()}
        className="flex items-center justify-center w-20 h-full text-2xl text-gray-300 cursor-pointer bg-green-600/50 transition hover:bg-green-600/80 rounded-br-md"
      >
        <FiLogOut />
      </button>
    </div>
  );
};

export default Navbar;
