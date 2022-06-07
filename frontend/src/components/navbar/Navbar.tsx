import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { mangasSearch } from "../../core/mangas";
import mangaStore from "../../store/MangaStore";

const Navbar = observer(() => {
    const router = useRouter();

    const logout = () => {
        userStore.logout();
        router.push("/login").then(() => {
            toast.warning("Logged out");
        });
    };

    return (
        <div className="fixed flex justify-between w-full h-16 bg-zinc-800 rounded-b-md shadow-sm">
            <div className="flex items-center w-full h-full px-10">
                <input
                    onChange={event => {
                        mangasSearch({ title: event.target.value }).then(request => {
                            if (event.target.value === "") {
                                mangaStore.resetMangas();
                                return;
                            }
                            if (request.data) {
                                mangaStore.mangas = request.data;
                            }
                        });
                    }}
                    type="text"
                    placeholder="Search"
                    className="w-full px-2 py-1 ml-5 text-gray-300 border-b border-transparent border-gray-400 rounded-t-lg outline-none h-4/6 bg-zinc-700 focus:ring-0"
                />
            </div>
            <button
                onClick={() => logout()}
                className="flex items-center justify-center w-20 h-full text-2xl text-gray-300 cursor-pointer bg-green-600/50 transition hover:bg-green-600/80 rounded-br-md"
            >
                <FiLogOut />
            </button>
        </div>
    );
});

export default Navbar;
