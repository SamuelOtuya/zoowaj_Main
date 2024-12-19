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
import { fetchAuthenticatedUserData } from "@/redux/services/profileService";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";

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

interface ApiProfile {
  _id: string;
  profilePhoto: {
    url: string;
  };
  about: {
    first_name: string;
    last_name: string;
    birthDate: string;
    maritalStatus: string;
  };
  marriageIntentions: {
    wantsChildren: string;
  };
  languageAndEthnicity: {
    ethnicOrigin: string;
    biography: string;
  };
  educationAndCareer: {
    profession: string;
  };
  likes: string[];
  favorites: string[];
}

const HomeScreen = () => {
  const [profiles, setProfiles] = useState<ApiProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const reject = require("../../../assets/images/reject.png");
  const match = require("../../../assets/images/match.png");
  const stared = require("../../../assets/images/stared.png");

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const transformProfile = (profile: ApiProfile): Profile => ({
    id: profile._id,
    image: profile.profilePhoto.url,
    name: `${profile.about.first_name} ${profile.about.last_name}`,
    address: profile.languageAndEthnicity.ethnicOrigin,
    tags: [
      profile.about.maritalStatus,
      profile.marriageIntentions.wantsChildren === "Yes" ? "Wants Children" : "Doesn't Want Children",
      profile.educationAndCareer.profession,
    ],
    age: calculateAge(profile.about.birthDate),
    bio: profile.languageAndEthnicity.biography,
    isLiked: profile.likes?.includes(userId),
    isFavorite: profile.favorites?.includes(userId),
  });

  const fetchProfiles = async () => {
    try {
      setError(null);
      const response = await API.get("/dev/data");
      console.log('Number of profiles in response:', response.data.length);
      setProfiles(response.data);
    } catch (err) {
      setError("Failed to load profiles. Please try again.");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await dispatch(fetchAuthenticatedUserData());
      setUserId(userData.payload?.id || "");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
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
          profile._id === profileId 
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
          profile._id === profileId
            ? {
                ...profile,
                favorites: profile.favorites?.includes(userId)
                  ? profile.favorites.filter(id => id !== userId)
                  : [...(profile.favorites || []), userId]
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
        prevProfiles.filter((profile) => profile._id !== profileId)
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
    <View style={styles.container}>
      <Text style={styles.countText}>Total Profiles: {profiles.length}</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProfileCard
            profile={transformProfile(item)}
            originalProfile={item}
            icons={{
              reject,
              match,
              stared,
            }}
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
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
});

export default HomeScreen;