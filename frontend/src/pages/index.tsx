// @ts-ignore
import { Reoverlay } from "reoverlay";
import { useEffect, useState } from "react";
import NavbarLayout from "../layouts/NavbarLayout";
import MangaCard from "../components/MangaCard";
import { mangasCreate, mangasGetAll } from "../core/mangas";
import {toast} from "react-toastify";

const Home: NextPageWithLayout = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);

  const refreshMangas = () => {
    mangasGetAll().then((request) => {
      setMangas(request.data);
    });
  };

  useEffect(() => {
    refreshMangas();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end h-20 mt-20 border-b border-gray-400/50">
        <button
          onClick={() => {
            Reoverlay.showModal("NewMangaModal", {
              onConfirm: (data: NewMangaResponse) => {
                mangasCreate(data).then(() => {
                  Reoverlay.hideModal();
                  toast.success("Successfully added a new manga");
                  refreshMangas();
                });
              },
            });
          }}
          className="px-4 py-2 text-gray-300 bg-green-700 rounded-md shadow-sm transition hover:bg-green-600"
        >
          New Manga
        </button>
      </div>

      {mangas.length > 0 ? (
        <div className="w-full mt-8 grid grid-cols-4 gap-x-3 gap-y-5">
          {mangas.map((value) => (
            <MangaCard
              key={value.id}
              refreshMangas={refreshMangas}
              manga={{
                id: value.id,
                title: value.title,
                url: value.url,
                poster: value.poster,
                chapter: value.chapter,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full text-3xl text-center text-gray-400 mt-28">
          <span>No mangas found :(</span>
        </div>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: JSX.Element) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
