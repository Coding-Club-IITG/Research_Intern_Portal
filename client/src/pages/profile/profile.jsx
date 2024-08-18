// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, time: true, required: true },
//     contact: { type: Number, required: true },
//     rollNo: { type: Number, required: true },
//     college: {
//       type: String,
//       default: "Indian Instituition of Technology, Guwahati",
//     },
//     password: { type: String, required: true },
//     //keeping a default value unless we outsource it for other colleges
//     course: {
//       type: String,
//       required: true,
//       enum: [
//         "BTech",
//         "MTech",
//         "BDes",
//         "MDes",
//         "MA",
//         "MSR",
//         "MSc",
//         "Phd",
//         "MBA",
//       ],
//     },
//     department: {
//       type: String,
//       required: true,
//       enum: [
//         "Chemistry",
//         "Chemical Enginerring",
//         "Computer Science",
//         "Design",
//         "Humanities and Social Science",
//         "Physics",
//         "Mathematics",
//         "Mehta School of Data Science",
//         "Mechanical Engineering",
//         "Electrical and Electronics Enginnering",
//         "Civil Engineering",
//         "Bioscience and Bioengineering",
//         "Energy Engineering",
//       ],
//     },
//     cpi: { type: Number, required: true },
//     social: [socialSchema],
//     dob: { type: Date, trim: true, required: true },
//     yearOfGrad: { type: Number, required: true },
//     resume: { type: String, trim: true, default: "" },
//     interest: [{ type: String }],
//   },
//   { timestamps: true }
// );

// const socialSchema = new mongoose.Schema({
//   platform: { type: String, required: true },
//   url: { type: String, required: true },
// });
/* eslint-disable react/no-array-index-key */

import React from "react";
import { Flex, Radio } from "antd";

const baseStyle = {
  width: "25%",
  height: 54,
};
const App = () => {
  const [value, setValue] = React.useState("horizontal");
  return (
    <Flex gap="middle" vertical>
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <Flex vertical={value === "vertical"}>
        {Array.from({
          length: 4,
        }).map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              backgroundColor: i % 2 ? "#1677ff" : "#1677ffbf",
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
export default App;
