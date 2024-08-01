import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMessages,
  getMessagesUser,
  sendMessage,
} from "../../../api/CoachApi/Message";
import UserChat from "../../../components/UserChat";
import FromUserChat from "../../../components/FormUserChat";
import SelectedCoachContext from "../../../Context/SelectedCoachContext";

const Chat = ({ route }) => {
  const [selectedCoach] = useContext(SelectedCoachContext);
  const userID = route.params?.userID || selectedCoach;
  const [message, setMessage] = useState({
    receiverID: userID,
    fromCoach: true,
    message: "",
  });
  console.log("ID", userID);

  const { mutate } = useMutation({
    mutationFn: () => sendMessage(message),
    mutationKey: ["sendMessage"],
  });
  // //

  const { data } = useQuery({
    queryKey: ["sendMessage"],
    queryFn: () => getMessages(userID),
  });

  console.log("messages", data);

  const messages = data?.messages.map((msg) =>
    msg.from == userID ? (
      <UserChat message={msg} />
    ) : (
      <FromUserChat message={msg} />
    )
  );
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages}
      </ScrollView>
      <View style={[styles.inputContainer, { marginHorizontal: 20 }]}>
        <TextInput
          placeholder="Type Message"
          multiline
          style={styles.input}
          onChangeText={(value) => setMessage({ ...message, message: value })}
          value={message}
        />

        <TouchableOpacity style={styles.sendButton} onPress={mutate}>
          <MaterialCommunityIcons name="send-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182026",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  messagesContainer: {
    padding: 10,
  },
  messageWrapperRight: {
    display: "flex",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  messageBubbleRight: {
    backgroundColor: "#68B0AB",
    padding: 10,
    width: "50%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageWrapperLeft: {
    display: "flex",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  messageBubbleLeft: {
    backgroundColor: "gray",
    padding: 10,
    width: "50%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 60,
  },
  input: {
    padding: 10,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
