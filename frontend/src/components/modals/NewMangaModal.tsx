import React from "react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import BaseModal from "./BaseModal";
import BasicButton from "../buttons/BasicButton";
import BasicInput from "../inputs/BasicInput";

const NewMangaModal = ({ onConfirm }: { onConfirm: (data: NewMangaResponse) => void }) => {
    const closeModal = () => {
        Reoverlay.hideModal();
    };

    const data: NewMangaResponse = {
        id: "",
        title: "",
        url: "",
        chapter: "",
    };

    return (
        <BaseModal>
            <p className="mb-2 text-xl text-gray-300">Add new manga</p>
            <hr />
            <div className="flex flex-col mt-7 space-y-5">
                <BasicInput
                    type="text"
                    placeholder="Title"
                    onChange={event => {
                        data.title = event.target.value;
                        data.id = data.title
                            .replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>\\{}[\]/]/gi, "")
                            .replaceAll(" ", "_");
                    }}
                />
                <BasicInput
                    type="text"
                    placeholder="URL"
                    onChange={event => {
                        data.url = event.target.value;
                    }}
                />
                <BasicInput
                    type="text"
                    placeholder="Chapter"
                    onChange={event => {
                        data.chapter = event.target.value;
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
                        onConfirm(data);
                    }}
                >
                    Create
                </BasicButton>
            </div>
        </BaseModal>
    );
};

export default NewMangaModal;
