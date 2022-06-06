// @ts-ignore
import { Reoverlay } from "reoverlay";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { observer } from "mobx-react-lite";
import NavbarLayout from "../layouts/NavbarLayout";
import MangaCard from "../components/MangaCard";
import { mangasCount, mangasCreate, mangasGetAllPaged } from "../core/mangas";
import BasicButton from "../components/buttons/BasicButton";
import mangaStore, { pageLimit } from "../store/MangaStore";

const Home: NextPageWithLayout = observer(() => {
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const hasLoadMore = () => {
    let maxPages = mangaStore.count / pageLimit;
    if (maxPages < 0) {
      maxPages = 0;
    }
    maxPages = Math.ceil(maxPages);
    return mangaStore.page + 1 <= maxPages;
  };

  const loadMore = () => {
    if (hasLoadMore()) {
      setLoadMoreLoading(true);
      mangasGetAllPaged(mangaStore.page + 1, pageLimit).then((request) => {
        mangaStore.mangas = mangaStore.mangas.concat(request.data);
        mangaStore.page += 1;
        setLoadMoreLoading(false);
      });
    }
  };

  useEffect(() => {
    mangasCount().then((request) => {
      mangaStore.count = request.data;
      mangaStore.resetMangas();
    });
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
                  mangaStore.resetMangas();
                });
              },
            });
          }}
          className="px-4 py-2 text-gray-300 bg-green-700 rounded-md shadow-sm transition hover:bg-green-600"
        >
          New Manga
        </button>
      </div>

      {mangaStore.mangas.length > 0 ? (
        <>
          <div className="w-full mt-8 grid grid-cols-4 gap-x-3 gap-y-5">
            {mangaStore.mangas.map((value) => (
              <MangaCard
                key={value.id}
                manga={{
                  id: value.id,
                  title: value.title,
                  url: value.url,
                  poster: value.poster,
                  chapter: value.chapter,
                  createdAt: value.createdAt,
                }}
              />
            ))}
          </div>
          {hasLoadMore() && (
            <div className="flex justify-center w-full mt-7 mb-7">
              <BasicButton
                color="primary"
                onClick={() => loadMore()}
                className="space-x-1"
              >
                {loadMoreLoading && (
                  <span className="animate-spin">
                    <ImSpinner2 />
                  </span>
                )}
                <span>Load more</span>
              </BasicButton>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center w-full text-3xl text-center text-gray-400 mt-28">
          <span>No mangas found :(</span>
        </div>
      )}
    </div>
  );
});

Home.getLayout = function getLayout(page: JSX.Element) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
