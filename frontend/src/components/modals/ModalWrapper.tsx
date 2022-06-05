// @ts-ignore
import { Reoverlay, ModalContainer } from "reoverlay";
import NewMangaModal from "./NewMangaModal";
import ConfirmModal from "./ConfirmModal";
import UpdateMangaModal from "./UpdateMangaModal";
import InfoMangaModal from "./InfoMangaModal";

Reoverlay.config([
  {
    name: "NewMangaModal",
    component: NewMangaModal,
  },
  {
    name: "UpdateMangaModal",
    component: UpdateMangaModal,
  },
  {
    name: "ConfirmModal",
    component: ConfirmModal,
  },
  {
    name: "InfoMangaModal",
    component: InfoMangaModal,
  },
]);

const ModalWrapper = () => {
  return <ModalContainer />;
};

export default ModalWrapper;
