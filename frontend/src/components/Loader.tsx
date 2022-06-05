import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900 space-y-5">
      <span className="text-3xl text-gray-400">Manga Collector</span>
      <span className="text-3xl text-gray-400 animate-spin">
        <ImSpinner2 />
      </span>
    </div>
  );
};

export default Loader;
