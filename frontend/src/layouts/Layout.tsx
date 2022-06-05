import { ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import ToastWrapper from "../components/ToastWrapper";
import userStore from "../store/UserStore";
import Loader from "../components/Loader";
import ModalWrapper from "../components/modals/ModalWrapper";

const Layout = observer(({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (userStore.isLoading) {
      userStore.update((success) => {
        if (success) {
          if (router.pathname !== "/") {
            router.push("/");
          }
        } else if (router.pathname !== "/login") {
          router.push("/login");
        }
      });
    }
  }, []);

  if (userStore.isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-screen min-h-screen overflow-hidden bg-zinc-900">
      <ToastWrapper />
      <ModalWrapper />
      {children}
    </div>
  );
});

export default Layout;
