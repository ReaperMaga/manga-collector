import React from "react";
// @ts-ignore
import { Reoverlay } from "reoverlay";
import BaseModal from "./BaseModal";
import BasicButton from "../buttons/BasicButton";

const ConfirmModal = ({ onConfirm }: { onConfirm: () => void }) => {
    const closeModal = () => {
        Reoverlay.hideModal();
    };

    return (
        <BaseModal>
            <p className="mb-2 text-xl text-gray-300">Are you sure?</p>
            <div className="flex items-center justify-end mt-8 space-x-3">
                <BasicButton color="danger" onClick={closeModal}>
                    No
                </BasicButton>
                <BasicButton
                    color="success"
                    onClick={() => {
                        onConfirm();
                    }}
                >
                    Yes
                </BasicButton>
            </div>
        </BaseModal>
    );
};

export default ConfirmModal;
