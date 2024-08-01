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
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
        }}
        accentColor="grey"
        textColor="red"
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
