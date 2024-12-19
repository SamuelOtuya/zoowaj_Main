import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import API from "@/api/api";
import { findNonSerializableValue } from "@reduxjs/toolkit";

interface Message {
  _id: string;
  message: string;
  sender?: string;
  recipient: string;
  createdAt: string;
  read: boolean;
}
const socket = io("https://social-smart-raven.ngrok-free.app:8000");
const ChatScreen = () => {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const recipientId = params.recipientId as string;
  const recipientName = params.recipientName as string;
  const recipientPhoto = params.recipientPhoto as string;

  useEffect(() => {
    socket.on("load message", (messages) => {
      console.log("fetching images using sockets");
      console.log(`retrieved ${messages.length} messages`);
      console.log(JSON.stringify(messages, null, 2));
      setMessages(messages);
    });
    return () => {
      // clearInterval(interval)
      socket.off("load message");
    };
  }, [recipientId]);

  // const fetchMessages = async () => {
  //   try {
  //     // Using both senderId and recipientId in the URL
  //     const senderId = "your-user-id"; // Replace with actual user ID
  //     const response = await API.get(`/message/get/${senderId}/${recipientId}`);

  //     // From your Postman response, it looks like the messages array is directly in the response
  //     // not nested under a 'messages' property
  //     if (response.data) {
  //       setMessages(response.data);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //     setLoading(false);
  //   }
  // };
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        userId: "your-user-id", // Replace with actual user ID from your auth system
        recipient: recipientId,
        message: newMessage.trim(),
      };

      socket.emit("chat message", { recipientId, newMessage });

      // const response = await API.post("/message", messageData);

      // if (response.data) {
      //   setMessages((prev) => [...prev, response.data]);
      //   setNewMessage("");
      //   flatListRef.current?.scrollToEnd();
      // }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.sender === "your-user-id"; // Replace with actual user ID comparison

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={[styles.messageText, !isMyMessage && { color: "#000" }]}>
          {item.message}
        </Text>
        <Text
          style={[
            styles.timestamp,
            !isMyMessage && { color: "rgba(0, 0, 0, 0.5)" },
          ]}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#20B2AA" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <Image source={{ uri: recipientPhoto }} style={styles.profileImage} />
        <Text style={styles.headerText}>{recipientName}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  messagesList: {
    padding: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 12,
    borderRadius: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#20B2AA",
    borderBottomRightRadius: 5,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#20B2AA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatScreen;
