
// @ts-ignore
import { ModalWrapper, Reoverlay } from 'reoverlay';
import React from "react";
import {AiOutlineClose} from "react-icons/ai";

const BaseModal = ({children}: {children: React.ReactNode}) => {
    const closeModal = () => {
        Reoverlay.hideModal();
    }

    return (
        <ModalWrapper animation="zoom">
            <div className="relative p-7 w-full bg-zinc-800 rounded-md min-w-[450px]">
                <label htmlFor="my-modal-3" className="absolute top-2 right-2 text-2xl text-red-500 transition hover:scale-105 cursor-pointer" onClick={closeModal}><AiOutlineClose /></label>
                {children}
            </div>
        </ModalWrapper>
    )
}

export default BaseModal