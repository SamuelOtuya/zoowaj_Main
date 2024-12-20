import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { UserProfileData } from "@/constants/types";
import { calculateAge } from "@/utils/calculate";
import { UserProfile } from "@/constants/models/userProfile.model";

const ProfileDetailsScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Parse profile data
  const profile: UserProfileData = UserProfile.fromJSON(
    JSON.parse(params.profile as string)
  );

  // Check if profile data is valid
  if (!profile || !profile.about) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Profile data is not available.</Text>
      </View>
    );
  }

  const handleMessagePress = () => {
    router.push({
      pathname: "/(main)/chat/id",
      params: {
        recipientId: profile.userId,
        recipientName: `${profile.about.first_name} ${profile.about.last_name}`,
        recipientPhoto: profile.profilePhoto?.url,
      },
    });
  };

  const renderDetailItem = (label: string, value: string | boolean) => {
    let displayValue =
      typeof value === "boolean" ? (value ? "Yes" : "No") : value || "N/A";
    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{displayValue}</Text>
      </View>
    );
  };

  const renderArrayDetailItem = (label: string, value: string[]) => {
    // Check if the value is an array and has items
    const displayValue =
      Array.isArray(value) && value.length > 0
        ? value.join(", ") // Join array elements into a single string
        : "N/A"; // Default to 'N/A' if the array is empty or not provided

    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: profile.profilePhoto?.url }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>
              {profile.about?.first_name || "Unknown"}{" "}
              {profile.about?.last_name || "Unknown"}
            </Text>
            <Text style={styles.age}>
              {calculateAge(profile.about?.birthDate)} years old
            </Text>
            <Text style={styles.username}>
              @{profile.about?.username || "unknown"}
            </Text>
          </View>
        </View>

        {/* Message Button */}
        <TouchableOpacity
          style={styles.messageButton}
          onPress={handleMessagePress}
        >
          <Text style={styles.messageButtonText}>Send Message</Text>
        </TouchableOpacity>

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {renderDetailItem("Height", profile.about?.height)}
          {renderDetailItem("Marital Status", profile.about?.maritalStatus)}
          {renderDetailItem(
            "Location",
            profile.languageAndEthnicity?.ethnicOrigin
          )}
        </View>

        {/* Religiosity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Religious Background</Text>
          {renderDetailItem("Muslim Sect", profile.religiosity?.muslimSect)}
          {renderDetailItem("Convert", profile.religiosity?.isConvert)}
          {renderDetailItem(
            "Religious Practice",
            profile.religiosity?.religiousPractice
          )}
          {renderDetailItem("Prayer Habits", profile.religiosity?.doYouPray)}
          {renderDetailItem("Dietary Preferences", profile.religiosity?.diet)}
        </View>

        {/* Marriage Intentions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marriage Intentions</Text>
          {renderDetailItem(
            "Looking to Marry",
            profile.marriageIntentions?.lookingToMarry
          )}
          {renderDetailItem(
            "Willing to Relocate",
            profile.marriageIntentions?.willingToRelocate
          )}
          {renderDetailItem(
            "Wants Children",
            profile.marriageIntentions?.wantsChildren
          )}
          {renderDetailItem(
            "Living Arrangements",
            profile.marriageIntentions?.livingArrangements
          )}
        </View>

        {/* Education & Career Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Career</Text>
          {renderDetailItem(
            "Profession",
            profile.educationAndCareer?.profession
          )}
          {renderDetailItem("Education", profile.educationAndCareer?.education)}
          {renderDetailItem("Job Title", profile.educationAndCareer?.jobTitle)}
        </View>

        {/* Language & Ethnicity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background</Text>
          {renderArrayDetailItem(
            "Languages",
            profile.languageAndEthnicity?.languages
          )}
          {renderDetailItem(
            "Ethnic Group",
            profile.languageAndEthnicity?.ethnicGroup
          )}
          {renderDetailItem(
            "Ethnic Origin",
            profile.languageAndEthnicity?.ethnicOrigin
          )}
        </View>

        {/* Biography Section */}
        {profile.languageAndEthnicity.biography && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.biography}>
              {profile.languageAndEthnicity.biography}
            </Text>
          </View>
        )}

        {/* Ice Breaker Section */}
        {profile.marriageIntentions.iceBreaker && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ice Breaker</Text>
            <Text style={styles.biography}>
              {profile.marriageIntentions.iceBreaker}
            </Text>
          </View>
        )}

        {/* Additional Photos Section */}
        {profile.coverPhotos && profile.coverPhotos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {profile.coverPhotos.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo.url }}
                  style={styles.additionalPhoto}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  age: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  username: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  messageButton: {
    backgroundColor: "#20B2AA",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  messageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20B2AA",
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  biography: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  additionalPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  centerContainer: {},
  errorText: {},
});

export default ProfileDetailsScreen;
