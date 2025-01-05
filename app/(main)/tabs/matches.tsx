import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const tabs = [
  { id: 0, title: 'Liked you' },
  { id: 1, title: 'Visited you' },
  { id: 2, title: 'Favourited' },
  { id: 3, title: 'Liked' },
];

export const CustomBack = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Image 
        source={require("../../../assets/images/backgreenarrow.png")} 
        style={styles.headerIcon} 
      />
    </TouchableOpacity>
  );
};

const Matches = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate loading time when switching tabs
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <>
      <Stack.Screen 
        options={{
          headerLeft: () => <CustomBack />,
          headerTitleAlign: 'center',
          headerTitle: 'Matches',
          headerRight: () => (
            <TouchableOpacity style={styles.filterButton}>
              <Image 
                source={require("../../../assets/images/filtergreen.png")} 
                style={styles.headerIcon} 
              />
            </TouchableOpacity>
          ),
        }} 
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab.id}
              style={styles.tab}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.title}
              </Text>
              {activeTab === tab.id && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.subHeaderText}>
            {tabs[activeTab].title}
          </Text>
          
          {loading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#20B2AA" />
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyText}>No matches found</Text>
              <Text style={styles.emptySubText}>
                Come back later to see your new matches
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  backButton: {
    marginLeft: 10,
  },
  filterButton: {
    marginRight: 10,
  },
  headerIcon: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#20B2AA',
    fontWeight: '600',
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
    fontWeight: '600',
    margin: 16,
    color: '#333',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Matches;