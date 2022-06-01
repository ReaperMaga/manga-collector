
import {FiLogOut} from "react-icons/fi";

const Navbar = () => {
    return (
        <div className="flex justify-between w-1/2 h-16 bg-zinc-800 rounded-b-md shadow-sm">
            <div className="" />
            <div className="w-20 h-full flex items-center justify-center text-2xl text-gray-300 bg-green-600/50 transition hover:bg-green-600/80 cursor-pointer rounded-br-md">
                <FiLogOut />
            </div>
        </div>
    );
};

export default Navbar;
