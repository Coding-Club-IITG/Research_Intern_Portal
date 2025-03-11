import Upload from "./Upload";

function Cv() {
  return (
    <div className="flex flex-row items-center border border-gray-300 dark:border-gray-400 m-4 flex-wrap">
      <div className="basis-1/4 grow m-6 shrink">
        <p className="font-semibold text-lg dark:text-white">Upload your recent resume or CV</p>
        <p className="opacity-80 dark:text-gray-300">File types: PDF</p>
      </div>
      <div className="basis-1/2 grow shrink m-8">
        <Upload />
      </div>
    </div>
  );
}

export default Cv;
