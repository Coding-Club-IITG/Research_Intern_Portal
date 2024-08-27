import { Input } from "antd";

function Skills() {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  return (
    <div>
      <div className="flex w-full space-x-4">
        <div className="w-1/3 p-4">
          <div className="font-bold">Skills</div>
          <div>What are you skilled at?</div>
        </div>
        <div className="flex-col w-2/3">
          <div></div>
          <Input
            className="grow shrink"
            showCount
            maxLength={20}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Skills;
