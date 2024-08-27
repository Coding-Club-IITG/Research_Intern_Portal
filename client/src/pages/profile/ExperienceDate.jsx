import React from "react";
import { DatePicker, Space } from "antd";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const App = () => (
  <Space className="w-full" direction="vertical">
    <DatePicker className="w-full" onChange={onChange} picker="month" />
  </Space>
);
export default App;
