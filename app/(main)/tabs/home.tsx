import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import ProfileCard from "../../../components/ProfileCard";
import API from "@/api/api";
import {
  fetchAuthenticatedUserData,
  fetchUserProfilesFromAPI,
} from "@/redux/services/profileService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { UserProfileData } from "@/constants/types";

const HomeScreen = () => {
  const [profiles, setProfiles] = useState<UserProfileData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const dispatch = useAppDispatch();

  const reject = require("../../../assets/images/reject.png");
  const match = require("../../../assets/images/match.png");
  const stared = require("../../../assets/images/stared.png");

  const { appProfiles, loading, error } = useAppSelector(
    (state) => state.profile
  );
  const { user } = useAppSelector((state) => state.auth);

  // Update profiles whenever appProfiles changes

  const fetchUserData = async () => {
    try {
      await dispatch(fetchAuthenticatedUserData());
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchUserProfiles = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchUserProfilesFromAPI());
    } catch (err) {
      console.error("Error fetching user profiles:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserProfiles();
    setProfiles(appProfiles);
    setUserId(user?.id);
  }, []);

  const handleRefresh = () => {
    fetchUserProfiles();
  };

  const handleLike = async (profileId: string) => {
    try {
      await API.post(`/users/like/${profileId}`);
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.userId === profileId
            ? { ...profile, likes: [...(profile.likes || []), userId] }
            : profile
        )
      );
    } catch (err) {
      console.error("Error liking profile:", err);
      alert("Failed to like profile. Please try again.");
    }
  };

  const handleFavorite = async (profileId: string) => {
    try {
      await API.post(`/users/favorite/${profileId}`);
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.userId === profileId
            ? {
                ...profile,
                favorites: profile.favorites?.includes(userId)
                  ? profile.favorites.filter((id) => id !== userId)
                  : [...(profile.favorites || []), userId],
              }
            : profile
        )
      );
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Failed to update favorite status. Please try again.");
    }
  };

  const handleReject = async (profileId: string) => {
    try {
      await API.post(`/users/reject/${profileId}`);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.userId !== profileId)
      );
    } catch (err) {
      console.error("Error rejecting profile:", err);
      alert("Failed to reject profile. Please try again.");
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#20B2AA" />
      </View>
    );
  }

  if (error && !loading && !profiles) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserProfiles}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Total Profiles: {profiles.length}</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }: { item: UserProfileData }) => (
          <ProfileCard
            profile={item}
            originalProfile={item}
            icons={{
              reject,
              match,
              stared,
            }}
            onLike={() => handleLike(item.userId)}
            onFavorite={() => handleFavorite(item.userId)}
            onReject={() => handleReject(item.userId)}
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
    padding: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#20B2AA",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
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
