import React from "react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import BaseModal from "../BaseModal";
import BasicButton from "../../buttons/BasicButton";
import { InfoSpan, InfoSpanLink } from "./InfoSpan";

const InfoMangaModal = ({ manga }: { manga: Manga }) => {
  const closeModal = () => {
    Reoverlay.hideModal();
  };

  return (
    <BaseModal>
      <p className="text-xl text-gray-300">{manga.title}</p>
      <p className="mb-2 text-gray-400 text-md">{manga.id}</p>
      <hr />
      <div className="flex flex-col text-gray-400 text-md mt-7 space-y-5">
        <InfoSpanLink label="URL" value={manga.url} />
        <InfoSpanLink label="Poster" value={manga.poster} />
        <InfoSpan label="Chapter" value={manga.chapter} />
      </div>
      <div className="flex items-center justify-end mt-8 space-x-3">
        <BasicButton color="danger" onClick={closeModal}>
          Close
        </BasicButton>
      </div>
    </BaseModal>
  );
};

export default InfoMangaModal;
