import {ImSpinner2} from "react-icons/im";

const Loader = () => {
  return (
      <div className="w-screen h-screen bg-zinc-900 flex flex-col space-y-5 items-center justify-center ">
          <span className="text-3xl text-gray-400">Manga Collector</span>
          <span className="text-3xl text-gray-400 animate-spin"><ImSpinner2 /></span>
      </div>
  )
}

export default Loader