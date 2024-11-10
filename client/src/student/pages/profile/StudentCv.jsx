import Upload from "./Upload";

function Cv() {
  return (
    <div className="flex flex-row border border-gray-300 dark:border-yellow-400 m-4 flex-wrap">
      <div className="basis-1/4 grow m-6 shrink">
        <p className="font-semibold text-lg dark:text-white">Upload your recent resume or CV</p>

        <p className=" opacity-80 dark:text-gray-300">Upload your most up-to-date resume</p>

        <p className="opacity-80 dark:text-gray-300">File types: DOC, DOCX, PDF, TXT</p>
      </div>
      <div className="basis-1/2 grow shrink m-8">
        <Upload />
      </div>
    </div>
  );
}

export default Cv;
