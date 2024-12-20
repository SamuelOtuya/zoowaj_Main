import io, { Socket } from "socket.io-client";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { messageData } from "@/constants/types";
import { baseURL } from "@/api/api";

const ChatScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const [texts, setTexts] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const recipientId = params.recipientId as string;
  const recipientName = params.recipientName as string;
  const recipientPhoto = params.recipientPhoto as string;

  const initializeSocket = async () => {
    try {
      const token = await AsyncStorage.getItem("bearerToken");
      if (!token) {
        throw new Error("Token not found");
      }

      const newSocket = io(baseURL, {
        query: { token },
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      // Handle 'load chat' messages
      newSocket.on("load chat", (texts: messageData[] | null) => {
        if (!texts || texts.length === 0) {
          console.log("No messages found, initializing empty chat.");
          setTexts([]);
        } else {
          const formattedMessages = texts.map((text) => ({
            _id: text.id,
            text: text.text,
            createdAt: new Date(text.createdAt),
            user: {
              _id:
                text.senderId === "your-user-id" ? "your-user-id" : recipientId,
              name: text.senderId === "your-user-id" ? "You" : recipientName,
              avatar: recipientPhoto,
            },
          }));
          setTexts(formattedMessages);
        }
        setLoading(false);
      });

      setSocket(newSocket);
    } catch (error) {
      console.error("Error initializing socket:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [recipientId]);

  const onSend = (newMessages: IMessage[]) => {
    if (!socket || !newMessages.length) return;

    try {
      socket.emit("send text", { recipientId, message: newMessages[0].text });
      setTexts((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
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

      <GiftedChat
        messages={texts}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: "your-user-id",
        }}
        renderInputToolbar={(props) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              onChangeText={(text) => setNewMessage(text)}
              value={newMessage}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !newMessage.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() =>
                onSend([{ text: newMessage, user: { _id: "your-user-id" } }])
              }
              disabled={!newMessage.trim()}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

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
