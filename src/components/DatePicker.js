import React, { useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ date = new Date(), setDate = () => {} }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View>
      <DateTimePicker
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          overflow: "hidden",
        }}
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default DatePicker;
