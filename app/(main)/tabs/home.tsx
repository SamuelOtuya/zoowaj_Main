import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import ProfileCard from "../../../components/ProfileCard";
import API from "@/api/api";
import { useAppSelector } from "@/redux/hooks/redux-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface About {
  username: string;
  birthDate: string;
  maritalStatus: string;
}

interface ProfilePhoto {
  url: string;
}

interface LanguageAndEthnicity {
  languages: string[];
}

interface Religiosity {
  muslimSect: string;
}

interface UserProfileData {
  _id: string;
  userId: string;
  profileId: string;
  likes: string[];
  favorites: string[];
  name: string;
  age: number;
  location: string;
  images?: string[];
  profilePhoto: ProfilePhoto;
  about: About;
  interests: string[];
  languageAndEthnicity: LanguageAndEthnicity;
  religiosity: Religiosity;
}

interface IconAssets {
  reject: number;
  match: number;
  stared: number;
}

const HomeScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfileData[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const icons: IconAssets = {
    reject: require("../../../assets/images/reject.png"),
    match: require("../../../assets/images/match.png"),
    stared: require("../../../assets/images/stared.png"),
  };

  const { authUser } = useAppSelector((state) => state.profile);

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("bearerToken");
      if (!token) {
        console.error("Authentication token not found");
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const fetchUserProfiles = async (): Promise<void> => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await API.get<UserProfileData[]>("/user/profiles");
      setProfiles(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const handleLike = async (profileId: string): Promise<void> => {
    try {
      if (!authUser?.userId) return;
      const token = await getToken();
      if (!token) return;

      const response = await API.post(`/user/profile/like`, {
        userId: authUser.userId,
        profileId,
      });

      if (response.data) {
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile._id === profileId
              ? {
                  ...profile,
                  likes: profile.likes.includes(authUser.userId)
                    ? profile.likes.filter((id) => id !== authUser.userId)
                    : [...profile.likes, authUser.userId],
                }
              : profile
          )
        );
      }
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  const handleFavorite = async (profileId: string): Promise<void> => {
    try {
      if (!authUser?.userId) return;
      const token = await getToken();
      if (!token) return;

      const response = await API.post(`/user/profile/favorite`, {
        userId: authUser.userId,
        profileId,
      });

      if (response.data) {
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile._id === profileId
              ? {
                  ...profile,
                  favorites: profile.favorites.includes(authUser.userId)
                    ? profile.favorites.filter((id) => id !== authUser.userId)
                    : [...profile.favorites, authUser.userId],
                }
              : profile
          )
        );
      }
    } catch (err) {
      console.error("Favorite Error:", err);
    }
  };

  const handleReject = async (profileId: string): Promise<void> => {
    try {
      if (!authUser?.userId) return;
      const token = await getToken();
      if (!token) return;

      const response = await API.post(`/user/profile/reject`, {
        userId: authUser.userId,
        profileId,
      });

      if (response.data) {
        setProfiles((prev) => prev.filter((profile) => profile._id !== profileId));
      }
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };

  const handleRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    await fetchUserProfiles();
    setRefreshing(false);
  }, []);

  const checkIsLiked = (profile: UserProfileData): boolean =>
    profile.likes?.includes(authUser?.userId || "");

  const checkIsFavorited = (profile: UserProfileData): boolean =>
    profile.favorites?.includes(authUser?.userId || "");

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#20B2AA" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerSubtitle}>
             {profiles.length} profiles
          </Text>
        </View>
        
        <FlatList
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              originalProfile={item}
              icons={icons}
              isLiked={checkIsLiked(item)}
              isFavorited={checkIsFavorited(item)}
              onLike={() => handleLike(item._id)}
              onFavorite={() => handleFavorite(item._id)}
              onReject={() => handleReject(item._id)}
            />
          )}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#20B2AA"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No profiles available</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  contentContainer: {
    paddingTop: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;