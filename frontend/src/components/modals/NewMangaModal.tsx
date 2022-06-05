import React from 'react';
// @ts-ignore
import { Reoverlay } from 'reoverlay';
import BaseModal from "./BaseModal";
import BasicButton from "../buttons/BasicButton";

const NewMangaModal = ({ onConfirm }: {onConfirm: () => void}) => {

    const closeModal = () => {
        Reoverlay.hideModal();
    }

    return (
        <BaseModal>
            <p className="text-lg text-gray-400">

            </p>
            <div className="flex justify-end items-center mt-8 space-x-3">
                <BasicButton color="danger" onClick={closeModal}>Cancel</BasicButton>
                <BasicButton color="success" onClick={() => {
                    onConfirm()
                }}>Create</BasicButton>
            </div>
        </BaseModal>
    )
}

export default NewMangaModal