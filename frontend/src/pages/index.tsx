import NavbarLayout from '../layouts/NavbarLayout';
import MangaCard from "../components/MangaCard";
// @ts-ignore
import {Reoverlay} from "reoverlay"

const Home: NextPageWithLayout = () => {
    return (
        <div className="w-full">
            <div className="mt-20 h-20 border-b border-gray-400/50 flex items-center justify-end">
                <button onClick={() => {
                    Reoverlay.showModal(
                        "NewMangaModal",
                        {
                            onConfirm: () => {

                            }
                        }
                    )

                }} className="bg-green-700 rounded-md shadow-sm px-4 py-2 text-gray-300 transition hover:bg-green-600">New Manga</button>
            </div>

            <div className="w-full grid grid-cols-4 mt-8 gap-x-3 gap-y-5">
                <MangaCard manga={{
                    id: "Redo Healer",
                    title: "Redo Healer",
                    url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                    poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                    chapter: "52"
                }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />      <MangaCard manga={{
                id: "Redo Healer",
                title: "Redo Healer",
                url: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                poster: "https://avt.mkklcdnv6temp.com/48/j/24-1634297934.jpg",
                chapter: "52"
            }} />

            </div>
        </div>
    );
};


Home.getLayout = function getLayout(page: JSX.Element) {
    return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
