import { ToastContainer } from "react-toastify";

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      limit={5}
    />
  );
};

export default ToastWrapper;
