import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import API from "@/api/api";

interface MessageUser {
  id: string;
  username: string;
  profilePicture: string;
  fullName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isLastMessageFromMe: boolean;
}

const MessageTab = () => {
  const [users, setUsers] = useState<MessageUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<MessageUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/user/chats");
      const transformedUsers: MessageUser[] = response.data.map(
        (user: any) => ({
          id: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          fullName: user.fullName,
          lastMessage: user.lastMessage,
          lastMessageTime: user.lastMessageTime,
          unreadCount: user.unreadCount,
          isLastMessageFromMe: user.isLastMessageFromMe,
        })
      );
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(text.toLowerCase()) ||
          user.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    },
    [users]
  );

  const handleMessagePress = async (profile: MessageUser) => {
    router.push({
      pathname: "/(main)/chat/chat",
      params: {
        recipientId: profile.id,
        recipientName: `${profile.username}`,
        recipientPhoto: profile.profilePicture,
      },
    });
  };

  const renderItem = ({ item }: { item: MessageUser }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleMessagePress(item)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.avatar}
          defaultSource={require("../../../assets/images/default-avatar.png")}
        />
        {item.unreadCount > 0 && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.conversationDetails}>
        <Text style={styles.name} numberOfLines={1}>
          {item.fullName}
        </Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(item.lastMessageTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Message</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#20B2AA"
          />
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshing={loading}
            onRefresh={fetchUsers}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {searchQuery ? "No matches found" : "No messages yet"}
              </Text>
            }
          />
        )}
      </View>
      {/* 
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#20B2AA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#f0f0f0",
  },
  unreadDot: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#20B2AA",
    borderWidth: 2,
    borderColor: "white",
  },
  conversationDetails: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
  timeContainer: {
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  tabItem: {
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#20B2AA",
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default MessageTab;
