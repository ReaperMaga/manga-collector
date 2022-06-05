import { useState } from "react";
import { Transition } from "@headlessui/react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import { toast } from "react-toastify";
import BasicButton from "./buttons/BasicButton";
import { mangasDelete, mangasUpdate } from "../core/mangas";

interface MangaCardProps {
  manga: Manga;
  refreshMangas: () => void;
}

const MangaCard = ({ manga, refreshMangas }: MangaCardProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="w-full h-64 bg-center bg-cover bg-zinc-600 rounded-md shadow-sm"
      style={{ backgroundImage: `url('${manga.poster}')` }}
    >
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative flex flex-col items-start justify-end w-full h-full cursor-default group bg-gradient-to-t from-zinc-800 to-transparent rounded-b-md transition hover:bg-zinc-900/90"
      >
        <span className="flex ml-2 text-xl text-gray-300 group-hover:hidden">
          {manga.title.length > 16
            ? `${manga.title.substring(0, 16)}...`
            : manga.title}
        </span>
        <span className="flex mb-3 ml-2 text-gray-400 text-md group-hover:hidden">
          Ch. {manga.chapter}
        </span>
        <Transition
          show={hovering}
          enter="transform transition duration-250"
          enterFrom="translate-y-9 opacity-0"
          enterTo="translate-y-0 opacity-100"
          as="div"
          className="absolute flex flex-col items-center justify-center w-full h-full space-y-3"
        >
          <BasicButton
            color="primary"
            onClick={() => {
              Reoverlay.showModal("InfoMangaModal", {
                manga,
              });
            }}
          >
            Info
          </BasicButton>
          <BasicButton
            color="success"
            onClick={() => {
              Reoverlay.showModal("UpdateMangaModal", {
                manga,
                onConfirm: (updatedManga: Manga) => {
                  mangasUpdate(updatedManga)
                    .then(() => {
                      Reoverlay.hideModal();
                      if (refreshMangas) {
                        refreshMangas();
                      }
                      toast.success("Successfully updated manga");
                    })
                    .catch(() => {
                      toast.error(
                        "There was an error while trying to update a manga"
                      );
                    });
                },
              });
            }}
          >
            Update
          </BasicButton>
          <BasicButton
            color="danger"
            onClick={() => {
              Reoverlay.showModal("ConfirmModal", {
                onConfirm: () => {
                  mangasDelete(manga.id)
                    .then(() => {
                      Reoverlay.hideModal();
                      if (refreshMangas) {
                        refreshMangas();
                      }
                      toast.warning("Successfully deleted manga");
                    })
                    .catch(() => {
                      toast.error(
                        "There was an error while trying to delete a manga"
                      );
                    });
                },
              });
            }}
          >
            Delete
          </BasicButton>
        </Transition>
      </div>
    </div>
  );
};

export default MangaCard;
