// @ts-ignore
import { Reoverlay } from "reoverlay";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import NavbarLayout from "../layouts/NavbarLayout";
import MangaCard from "../components/MangaCard";
import { mangasCount, mangasCreate, mangasGetAllPaged } from "../core/mangas";
import BasicButton from "../components/buttons/BasicButton";

const pageLimit = 4;

const Home: NextPageWithLayout = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const refreshMangas = () => {
    mangasGetAllPaged(page, pageLimit).then((request) => {
      setMangas(request.data);
    });
  };

  const hasLoadMore = () => {
    let maxPages = count / pageLimit;
    if (maxPages < 0) {
      maxPages = 0;
    }
    maxPages = Math.ceil(maxPages);
    return page + 1 <= maxPages;
  };

  const loadMore = () => {
    if (hasLoadMore()) {
      setLoadMoreLoading(true)
      mangasGetAllPaged(page + 1, pageLimit).then((request) => {
        setMangas(mangas.concat(request.data));
        setPage(page + 1);
        setLoadMoreLoading(false)
      });
    }
  };

  useEffect(() => {
    mangasCount().then((request) => {
      setCount(request.data);
      refreshMangas();
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
        <>
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
          {hasLoadMore() && (
            <div className="flex justify-center w-full mt-7">
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
};

Home.getLayout = function getLayout(page: JSX.Element) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
