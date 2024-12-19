import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface DetailedProfile {
  _id: string;
  profilePhoto: {
    url: string;
    public_id: string;
  };
  about: {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    birthDate: string;
    height: string;
    maritalStatus: string;
    tagline: string;
  };
  religiosity: {
    muslimSect: string;
    isConvert: string;
    religiousPractice: string;
    doYouPray: string;
    diet: string;
    doYouSmoke: string;
    hasTattoos: string;
  };
  marriageIntentions: {
    lookingToMarry: string;
    willingToRelocate: string;
    wantsChildren: string;
    livingArrangements: string;
    iceBreaker: string;
  };
  languageAndEthnicity: {
    languages: string;
    ethnicGroup: string;
    ethnicOrigin: string;
    biography: string;
  };
  educationAndCareer: {
    profession: string;
    education: string;
    jobTitle: string;
  };
  coverPhotos: Array<{
    url: string;
    public_id: string;
  }>;
}

const ProfileDetailsScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const profile: DetailedProfile = JSON.parse(params.profile as string);

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

  const handleMessagePress = () => {
    router.push({
      pathname: '/(main)/chat/id',
      params: {
        recipientId: profile._id,
        recipientName: `${profile.about.first_name} ${profile.about.last_name}`,
        recipientPhoto: profile.profilePhoto.url
      }
    });
  };

  const renderDetailItem = (label: string, value: string) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: profile.profilePhoto.url }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>
              {profile.about.first_name} {profile.about.last_name}
            </Text>
            <Text style={styles.age}>
              {calculateAge(profile.about.birthDate)} years old
            </Text>
            <Text style={styles.username}>@{profile.about.username}</Text>
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
          {renderDetailItem("Height", profile.about.height)}
          {renderDetailItem("Marital Status", profile.about.maritalStatus)}
          {renderDetailItem("Location", profile.languageAndEthnicity.ethnicOrigin)}
        </View>

        {/* Religiosity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Religious Background</Text>
          {renderDetailItem("Muslim Sect", profile.religiosity.muslimSect)}
          {renderDetailItem("Convert", profile.religiosity.isConvert)}
          {renderDetailItem("Religious Practice", profile.religiosity.religiousPractice)}
          {renderDetailItem("Prayer Habits", profile.religiosity.doYouPray)}
          {renderDetailItem("Dietary Preferences", profile.religiosity.diet)}
        </View>

        {/* Marriage Intentions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marriage Intentions</Text>
          {renderDetailItem("Looking to Marry", profile.marriageIntentions.lookingToMarry)}
          {renderDetailItem("Willing to Relocate", profile.marriageIntentions.willingToRelocate)}
          {renderDetailItem("Wants Children", profile.marriageIntentions.wantsChildren)}
          {renderDetailItem("Living Arrangements", profile.marriageIntentions.livingArrangements)}
        </View>

        {/* Education & Career Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Career</Text>
          {renderDetailItem("Profession", profile.educationAndCareer.profession)}
          {renderDetailItem("Education", profile.educationAndCareer.education)}
          {renderDetailItem("Job Title", profile.educationAndCareer.jobTitle)}
        </View>

        {/* Language & Ethnicity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background</Text>
          {renderDetailItem("Languages", profile.languageAndEthnicity.languages)}
          {renderDetailItem("Ethnic Group", profile.languageAndEthnicity.ethnicGroup)}
          {renderDetailItem("Ethnic Origin", profile.languageAndEthnicity.ethnicOrigin)}
        </View>

        {/* Biography Section */}
        {profile.languageAndEthnicity.biography && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.biography}>{profile.languageAndEthnicity.biography}</Text>
          </View>
        )}

        {/* Ice Breaker Section */}
        {profile.marriageIntentions.iceBreaker && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ice Breaker</Text>
            <Text style={styles.biography}>{profile.marriageIntentions.iceBreaker}</Text>
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
  },
  age: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  username: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  messageButton: {
    backgroundColor: '#20B2AA',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  messageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  biography: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  additionalPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ProfileDetailsScreen;