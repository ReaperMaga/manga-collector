// @ts-ignore
import { Reoverlay, ModalContainer } from "reoverlay";
import NewMangaModal from "./NewMangaModal";

// Here you pass your modals to Reoverlay
Reoverlay.config([
    {
        name: "NewMangaModal",
        component: NewMangaModal
    },
])

const ModalWrapper = () => {
    return <ModalContainer />
}

export default ModalWrapper