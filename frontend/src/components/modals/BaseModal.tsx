// @ts-ignore
import { ModalWrapper, Reoverlay } from "reoverlay";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const BaseModal = ({ children }: { children: React.ReactNode }) => {
    const closeModal = () => {
        Reoverlay.hideModal();
    };

    return (
        <ModalWrapper animation="zoom">
            <div className="relative w-full p-7 bg-zinc-800 rounded-md min-w-[450px]">
                <button
                    className="absolute text-2xl text-red-500 cursor-pointer top-2 right-2 transition hover:scale-105"
                    onClick={closeModal}
                >
                    <AiOutlineClose />
                </button>
                {children}
            </div>
        </ModalWrapper>
    );
};

export default BaseModal;
