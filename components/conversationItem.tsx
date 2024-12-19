import { UserProfileData } from "@/constants/types";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ConversationItemProps {
  item: UserProfileData;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ item }) => {
  const router = useRouter();
  const defaultAvatarPath = require("../../../assets/images/profile.png");

  return (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        router.push({
          pathname: "/(main)/chat/id",
          params: { id: item.userId },
        })
      }
    >
      {item.profilePhoto.url ? (
        <Image
          source={{ uri: item.profilePhoto.url }}
          style={styles.avatar}
          defaultSource={defaultAvatarPath}
        />
      ) : (
        <View style={styles.avatar} />
      )}

      <View style={styles.conversationDetails}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{item.about.username}</Text>
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
