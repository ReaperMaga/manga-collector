import React from "react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import BaseModal from "./BaseModal";
import BasicButton from "../buttons/BasicButton";

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
        <span className="flex space-x-2">
          <span>URL:</span>
          <a
            className="text-blue-600 underline"
            href={manga.url}
            target="_blank"
            rel="noreferrer"
          >
            {manga.url}
          </a>
        </span>
        <span className="flex space-x-2">
          <span>Poster:</span>
          <a
            className="text-blue-600 underline"
            href={manga.poster}
            target="_blank"
            rel="noreferrer"
          >
            {manga.poster}
          </a>
        </span>

        <span className="flex space-x-2">
          <span>Chapter:</span>
          <span>{manga.chapter}</span>
        </span>
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
