import React from "react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import BaseModal from "./BaseModal";
import BasicButton from "../buttons/BasicButton";
import BasicInput from "../inputs/BasicInput";

const UpdateMangaModal = ({ onConfirm, manga }: { onConfirm: (updatedManga: Manga) => void; manga: Manga }) => {
    const closeModal = () => {
        Reoverlay.hideModal();
    };

    const updatedManga: Manga = manga;

    return (
        <BaseModal>
            <p className="text-xl text-gray-300">Update manga</p>
            <p className="mb-2 text-gray-400 text-md">{manga.title}</p>
            <hr />
            <div className="flex flex-col mt-7 space-y-5">
                <BasicInput
                    type="text"
                    placeholder="Title"
                    defaultValue={manga.title}
                    onChange={event => {
                        updatedManga.title = event.target.value;
                    }}
                />
                <BasicInput
                    type="text"
                    placeholder="Chapter"
                    defaultValue={manga.chapter}
                    onChange={event => {
                        updatedManga.chapter = event.target.value;
                    }}
                />
                <BasicInput
                    type="text"
                    placeholder="Poster"
                    defaultValue={manga.poster}
                    onChange={event => {
                        updatedManga.poster = event.target.value;
                    }}
                />
            </div>
            <div className="flex items-center justify-end mt-8 space-x-3">
                <BasicButton color="danger" onClick={closeModal}>
                    Cancel
                </BasicButton>
                <BasicButton
                    color="success"
                    onClick={() => {
                        onConfirm(updatedManga);
                    }}
                >
                    Update
                </BasicButton>
            </div>
        </BaseModal>
    );
};

export default UpdateMangaModal;
