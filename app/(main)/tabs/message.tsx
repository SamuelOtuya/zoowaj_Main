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
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import API from "@/api/api";

// Define types for better type safety
interface User {
  id: string;
  username: string;
  profilePicture: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface ConversationItemProps {
  item: User;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ item }) => {
  const router = useRouter();
  const defaultAvatarPath = require("../../../assets/images/profile.png");

  return (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        router.push({
          pathname: "/(main)/chat/id",
          params: { id: item.id },
        })
      }
    >
      {item.profilePicture ? (
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.avatar}
          defaultSource={defaultAvatarPath}
        />
      ) : (
        <View style={styles.avatar} />
      )}

      <View style={styles.conversationDetails}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{item.username}</Text>
          {item.lastMessageTime && (
            <Text style={styles.time}>{item.lastMessageTime}</Text>
          )}
        </View>
        {item.lastMessage && (
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        )}
      </View>

      {item.unreadCount && item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const MessageTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backgreenarrowPath = require("../../../assets/images/backgreenarrow.png");

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.get("/users"); // Adjust endpoint as needed
      const userData = response.data;

      // Transform API response if needed
      const transformedUsers: User[] = userData.map((user: any) => ({
        id: user.id,
        username: user.username,
        profilePicture: user.profile_picture,
        lastMessage: user.last_message,
        lastMessageTime: user.last_message_time,
        unreadCount: user.unread_count,
      }));

      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle search
  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text.trim() === "") {
        setFilteredUsers(users);
        return;
      }

      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    },
    [users]
  );

  // Pull to refresh implementation
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  }, [fetchUsers]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Image
                source={backgreenarrowPath}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitle: "Messages",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Image
                source={require("../../../assets/images/filtergreen.png")}
                style={{ height: 38, width: 38, objectFit: "contain" }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Chat"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== "" && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#20B2AA" />
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={({ item }) => <ConversationItem item={item} />}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchQuery ? "No users found" : "No conversations yet"}
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default MessageTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearButton: {
    padding: 5,
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    marginRight: 15,
  },
  conversationDetails: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
  message: {
    color: "gray",
  },
  unreadBadge: {
    backgroundColor: "#20B2AA",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#20B2AA",
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});
