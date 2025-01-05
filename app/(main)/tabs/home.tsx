import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import ProfileCard from "../../../components/ProfileCard";
import API from "@/api/api";
import { useAppSelector } from "@/redux/hooks/redux-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  about?: string;
  profilePhoto: {
    url: string;
  };
  about: {
    username: string;
    birthDate: string;
    maritalStatus: string;
  };
  interests: string[];
  languageAndEthnicity: {
    languages: string[];
  };
  religiosity: {
    muslimSect: string;
  };
}

const HomeScreen = () => {
  const [profiles, setProfiles] = useState<UserProfileData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const reject = require("../../../assets/images/reject.png");
  const match = require("../../../assets/images/match.png");
  const stared = require("../../../assets/images/stared.png");

  const { authUser } = useAppSelector((state) => state.profile);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("bearerToken");
    if (!token) {
      console.error("Authentication token not found");
      return null;
    }
    return token;
  };

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await API.get("/user/profiles");
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

  const updateProfileField = (profileId: string, field: string, value: any) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile._id === profileId
          ? {
              ...profile,
              [field]: value,
            }
          : profile
      )
    );
  };

  const handleLike = async (profileId) => {
    try {
      if (!authUser?.userId) return;
      const token = await AsyncStorage.getItem("bearerToken");
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
  
  const handleFavorite = async (profileId) => {
    try {
      if (!authUser?.userId) return;
      const token = await AsyncStorage.getItem("bearerToken");
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
  

  const handleReject = async (profileId: string) => {
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfiles();
    setRefreshing(false);
  };

  const checkIsLiked = (profile: UserProfileData) =>
    profile.likes?.includes(authUser?.userId || "");

  const checkIsFavorited = (profile: UserProfileData) =>
    profile.favorites?.includes(authUser?.userId || "");

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#20B2AA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Total Profiles: {profiles.length}</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProfileCard
            profile={item}
            originalProfile={item}
            icons={{ reject, match, stared }}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  countText: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
});

export default HomeScreen;
