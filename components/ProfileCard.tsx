import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { UserProfileData } from "@/constants/types";
import { calculateAge } from "@/utils/calculate";

interface ProfileCardProps {
  profile: {
    _id: string;
    userId: string;
    profileId: string;
    likes: string[];
    favorites: string[];
    name: string;
    age: number;
    location: string;
    images?: string[];
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
  };
  originalProfile: {
    _id: string;
    userId: string;
    profileId: string;
    likes: string[];
    favorites: string[];
    name: string;
    age: number;
    location: string;
    images?: string[];
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
  };
  icons: {
    reject: number;
    match: number;
    stared: number;
  };
  isLiked: boolean;
  isFavorited: boolean;
  onLike: () => void;
  onFavorite: () => void;
  onReject: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  originalProfile,
  icons,
  isLiked,
  isFavorited,
  onLike,
  onFavorite,
  onReject,
}) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handleProfilePress = () => {
    router.push({
      pathname: "/(main)/details",
      params: { profile: JSON.stringify(originalProfile) },
    });
  };

  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  };

  const handleActionPress = (action: () => void) => {
    animateButton(action);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity 
          onPress={handleProfilePress}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: profile.profilePhoto.url }}
            style={styles.image}
          />
          <View style={styles.gradient} />
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>
              {profile.about.username}
              {profile.about.birthDate
                ? `, ${calculateAge(profile.about.birthDate)}`
                : ""}
            </Text>
            <Text style={styles.locationText}>
              {profile.about.maritalStatus}
            </Text>
            <View style={styles.tagsContainer}>
              {profile.interests.map((tag, index) => (
                <View key={index} style={styles.tagContainer}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              {profile.languageAndEthnicity.languages.map((tag, index) => (
                <View key={`lang-${index}`} style={styles.tagContainer}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>
                  {profile.religiosity.muslimSect}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[styles.iconButton, styles.rejectButton]}
              onPress={() => handleActionPress(onReject)}
            >
              <Image source={icons.reject} style={styles.icon} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[styles.iconButton, styles.likeButton, isLiked && styles.likedButton]}
              onPress={() => handleActionPress(onLike)}
            >
              <Image
                source={icons.match}
                style={[styles.icon, isLiked && styles.likedIcon]}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[styles.iconButton, styles.favoriteButton, isFavorited && styles.favoritedButton]}
              onPress={() => handleActionPress(onFavorite)}
            >
              <Image
                source={icons.stared}
                style={[styles.icon, isFavorited && styles.favoritedIcon]}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginBottom: 35,
  },
  cardContainer: {
    position: "relative",
    marginTop: 10,
    borderRadius: 26,
    overflow: "visible",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    height: 400,
    width: "100%",
    borderRadius: 26,
    backgroundColor: "#f0f0f0",
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  infoContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  locationText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tagContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  tagText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
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
    padding: 12,
    borderRadius: 50,
    backgroundColor: "white",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  rejectButton: {
    backgroundColor: "#FFF",
  },
  likeButton: {
    backgroundColor: "#FFF",
  },
  likedButton: {
    backgroundColor: "#FFE8E8",
  },
  likedIcon: {
    tintColor: "#FF4B4B",
  },
  favoriteButton: {
    backgroundColor: "#FFF",
  },
  favoritedButton: {
    backgroundColor: "#FFF9E8",
  },
  favoritedIcon: {
    tintColor: "#FFB800",
  },
});

export default ProfileCard;