import { PuffLoader } from "react-spinners";

const Loading = ({ active }) => {
  return (
    <div
      id="loading"
      className={`${
        active && "active"
      } z-20 invisible fixed top-0 right-0 bottom-0 left-0`}
    >
      <div
        id="loading__overlay"
        className="transition-all absolute w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center opacity-0"
      >
        <PuffLoader color="white" />
      </div>
    </div>
  );
};

export default Loading;
