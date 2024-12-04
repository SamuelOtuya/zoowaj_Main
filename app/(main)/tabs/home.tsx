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
import { useNavigation } from "expo-router";
import ProfileCard from "../../../components/ProfileCard";
import API from "@/api/api";
import reject from "../../../assets/images/reject.png";
import match from "../../../assets/images/match.png";
import stared from "../../../assets/images/stared.png";

interface Profile {
  id: string;
  image: string;
  name: string;
  address: string;
  tags: string[];
  age?: number;
  bio?: string;
  isLiked?: boolean;
  isFavorite?: boolean;
}

const HomeScreen = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchProfiles = async () => {
    try {
      setError(null);
      const response = await API.get("/users/profiles");

      const transformedProfiles: Profile[] = response.data.map(
        (profile: any) => ({
          id: profile.id,
          image: profile.profile_photo,
          name: profile.name,
          address: `${profile.city}, ${profile.country}`,
          tags: [
            profile.marital_status,
            profile.has_children ? "Has Children" : "No Children",
            profile.country,
          ],
          age: profile.age,
          bio: profile.bio,
          isLiked: profile.is_liked,
          isFavorite: profile.is_favorite,
        })
      );

      setProfiles(transformedProfiles);
    } catch (err) {
      setError("Failed to load profiles. Please try again.");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfiles();
  };

  const handleLike = async (profileId: string) => {
    try {
      await API.post(`/users/like/${profileId}`);

      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === profileId ? { ...profile, isLiked: true } : profile
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
          profile.id === profileId
            ? { ...profile, isFavorite: !profile.isFavorite }
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
        prevProfiles.filter((profile) => profile.id !== profileId)
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

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfiles}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProfileCard
          profile={item}
          onLike={() => handleLike(item.id)}
          onFavorite={() => handleFavorite(item.id)}
          onReject={() => handleReject(item.id)}
          icons={{
            reject: reject,
            match: match,
            stared: stared,
          }}
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
  );
};

const styles = StyleSheet.create({
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
});

export default HomeScreen;
