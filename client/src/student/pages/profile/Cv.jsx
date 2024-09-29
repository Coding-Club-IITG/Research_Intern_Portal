import Upload from "./Upload";

function Cv() {
  return (
    <div className="flex flex-row border border-gray-300 m-4 flex-wrap">
      <div className="basis-1/4 grow m-6 shrink">
        <p className="font-semibold text-lg ">Upload your recent resume or CV</p>

        <p className=" opacity-80">Upload your most up-to-date resume</p>

        <p className="opacity-80">File types: DOC, DOCX, PDF, TXT</p>
      </div>
      <div className="basis-1/2 grow shrink m-8">
        <Upload />
      </div>
    </div>
  );
}

export default Cv;
