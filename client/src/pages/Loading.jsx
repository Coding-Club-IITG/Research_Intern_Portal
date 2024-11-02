import React from "react";
import { Spin } from "antd";

const contentStyle = {
  padding: 50,
  borderRadius: 4
};

const content = <div style={contentStyle} />;

const App = () => (
  <div className="flex items-center justify-center h-screen">
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </div>
);

export default App;
