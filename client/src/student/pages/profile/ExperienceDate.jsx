import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment"; // Import moment here

const ExperienceDate = ({ date, onChange }) => {
  const handleChange = (date) => {
    if (date) {
      const dateString = date.format("MMMM, YYYY");
      onChange(dateString);
    } else {
      onChange("");
    }
  };

  return (
    <Space className="w-full" direction="vertical">
      <DatePicker
        className="w-full"
        onChange={handleChange}
        picker="month"
        value={date ? moment(date) : null}
      />
    </Space>
  );
};

export default ExperienceDate;
