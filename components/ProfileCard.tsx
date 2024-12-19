import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { UserProfileData } from "@/constants/types";
import { calculateAge } from "@/utils/calculate";

interface ProfileCardProps {
  profile: UserProfileData;
  originalProfile: any; // Full API response for the profile
  icons: {
    reject: any;
    match: any;
    stared: any;
  };
  onLike: () => void;
  onFavorite: () => void;
  onReject: () => void;
}

const ProfileCard = ({
  profile,
  originalProfile,
  icons,
  onLike,
  onFavorite,
  onReject,
}: ProfileCardProps) => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push({
      pathname: "/(main)/details",
      params: { profile: JSON.stringify(originalProfile) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{ uri: profile.profilePhoto.url }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>
              {profile.about.username}
              {profile.about.birthDate ? `, ${calculateAge(profile.about.birthDate)}` : ""}
            </Text>
            <Text style={styles.locationText}>
              {profile.about.maritalStatus}
            </Text>
            <View style={styles.tagsContainer}>
              {profile.interests.map((tag, index) => (
                <Text key={index} style={styles.tagText}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onReject}>
            <Image source={icons.reject} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onLike}>
            <Image source={icons.match} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onFavorite}>
            <Image source={icons.stared} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  cardContainer: {
    position: "relative",
    marginTop: 10,
    borderRadius: 26,
    overflow: "visible",
  },
  image: {
    height: 400,
    width: "100%",
    borderRadius: 26,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    position: "absolute",
    bottom: 70,
    width: "100%",
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  locationText: {
    color: "white",
    fontWeight: "normal",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tagText: {
    color: "white",
    fontSize: 14,
    backgroundColor: "rgba(10, 10, 10, 0.8)",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -28,
    left: 0,
    right: 0,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
    elevation: 5,
    marginHorizontal: 14,
  },
});

export default ProfileCard;
