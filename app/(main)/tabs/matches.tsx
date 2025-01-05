import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import backgreenarrow from "../../../assets/images/backgreenarrow.png"
import filterGreen from "../../../assets/images/filtergreen.png"
import axios from 'axios'

export const Customback = () => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Image source={backgreenarrow} style={{ height: 38, width: 38, objectFit: 'contain' }} />
    </TouchableOpacity>
  )
}

const Matches = () => {
  const tabs = ['Liked you', 'Visited you', 'Favourited', 'Liked'];
  const [activeTab, setActiveTab] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'YOUR_API_BASE_URL';

  const fetchMatches = async (type) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint;
      switch(type) {
        case 0: // Liked you
          endpoint = `${API_BASE_URL}/api/matches/liked-by`;
          break;
        case 2: // Favourited
          endpoint = `${API_BASE_URL}/api/matches/favourited-by`;
          break;
        default:
          setMatches([]);
          setLoading(false);
          return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': 'Bearer YOUR_AUTH_TOKEN'
        }
      });

      setMatches(response.data);
    } catch (err) {
      setError('Failed to fetch matches');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(activeTab);
  }, [activeTab]);

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchCard}>
      <View style={styles.profilePicPlaceholder} />
      <Text style={styles.nameText}>{item.name}, {item.age}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{
        headerLeft: () => <Customback />,
        headerTitleAlign: 'center',
        headerTitle: 'Matches',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image source={filterGreen} style={{ height: 38, width: 38, objectFit: 'contain' }} />
          </TouchableOpacity>
        )
      }} />

      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.tab}
              onPress={() => setActiveTab(index)}
            >
              <Text style={[styles.tabText, index === activeTab && styles.activeTabText]}>{tab}</Text>
              {index === activeTab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.subHeaderText}>{tabs[activeTab]}</Text>
        
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#20B2AA" />
          </View>
        ) : error ? (
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={matches}
            renderItem={renderMatchItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.matchList}
          />
        )}
      </SafeAreaView>
    </>
  )
}

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabText: {
    color: 'gray',
  },
  activeTabText: {
    color: '#20B2AA',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '80%',
    backgroundColor: '#20B2AA',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  matchList: {
    justifyContent: 'space-around',
  },
  matchCard: {
    width: '45%',
    aspectRatio: 0.7,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  profilePicPlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#d0d0d0',
    borderRadius: 8,
    marginBottom: 8,
  },
  nameText: {
    fontWeight: 'bold',
  },
  locationText: {
    color: 'gray',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});