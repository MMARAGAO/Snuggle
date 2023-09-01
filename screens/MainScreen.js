import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  Animated,
  Linking,
} from "react-native";
import { Appbar } from "react-native-paper";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";

const MyLocationButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.myLocationButton}>
    <MaterialIcons name="my-location" size={24} color="white" />
  </TouchableOpacity>
);

const DonateButton = ({ onPress }) => (
  <TouchableOpacity style={styles.donateButton} onPress={onPress}>
    <FontAwesome5 name="donate" size={24} color="white" />
  </TouchableOpacity>
);

const MainScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [routeButtonVisible, setRouteButtonVisible] = useState(true);
  const [donateButtonVisible, setDonateButtonVisible] = useState(true);

  const fixedMarkers = [
    {
      latitude: -15.789456,
      longitude: -47.897654,
      description: "Marker 1 Description",
    },
    {
      latitude: -15.725689,
      longitude: -47.822345,
      description: "Marker 2 Description",
    },
    {
      latitude: -15.789456,
      longitude: -47.822345,
      description: "Marker 3 Description",
    },
    {
      latitude: -15.725689,
      longitude: -47.897654,
      description: "Marker 4 Description",
    },
  ];

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude });
          setMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };
    getUserLocation();
  }, []);

  const handleMyLocationButtonPress = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const customMapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const handleMarkerPress = (coordinate) => {
    setSelectedMarker(coordinate);
    setRouteButtonVisible(true);
    setDonateButtonVisible(true);
  };

  const handleClearSelection = () => {
    setSelectedMarker(null);
  };

  const handleOpenInMaps = () => {
    if (selectedMarker) {
      const { latitude, longitude } = selectedMarker;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
      Linking.openURL(url);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Keyboard.dismiss();
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setLocationNotFound(false);

    try {
      const response = await Location.geocodeAsync(searchQuery);
      if (response.length > 0) {
        setMapRegion({
          latitude: response[0].latitude,
          longitude: response[0].longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        });
      } else {
        setLocationNotFound(true);
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setTimeout(() => {
          setLocationNotFound(false);
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }, 2000);
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapTap = () => {
    setRouteButtonVisible(false);
    setDonateButtonVisible(false); // Hide donate button on map tap
  };

  const handleDonateButtonPress = () => {
    const donateUrl = "https://your-donation-url.com"; // Replace with your actual donation URL
    Linking.openURL(donateUrl);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        customMapStyle={customMapStyle}
        onPress={handleMapTap}
      >
        {fixedMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Marker ${index + 1}`}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <FontAwesome5 name="gift" size={24} color="rgba(255, 0, 0, 0.7)" />
          </Marker>
        ))}
      </MapView>
      {routeButtonVisible && selectedMarker && (
        <TouchableOpacity style={styles.routeButton} onPress={handleOpenInMaps}>
          <MaterialIcons name="directions" size={24} color="white" />
        </TouchableOpacity>
      )}
      {donateButtonVisible && selectedMarker && (
        <DonateButton onPress={handleDonateButtonPress} />
      )}
      <Appbar.Header style={styles.appBar}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search for a location"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.searchButton}
            disabled={loading}
            onPress={handleSearch}
          >
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Appbar.Header>
      <MyLocationButton onPress={handleMyLocationButtonPress} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(0, 100, 255, 0.7)" />
        </View>
      )}
      <Animated.View
        style={[styles.notFoundContainer, { opacity: opacityValue }]}
      >
        <Text style={styles.notFoundText}>Location not found</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  appBar: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: Dimensions.get("window").width / 2,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: Dimensions.get("window").width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  myLocationButton: {
    position: "absolute",
    bottom: 100,
    right: 16,
    backgroundColor: "rgba(0, 100, 255, 0.7)",
    borderRadius: 24,
    padding: 8,
  },
  routeButton: {
    position: "absolute",
    bottom: 150,
    right: 16,
    backgroundColor: "rgba(0, 100, 255, 0.7)",
    borderRadius: 24,
    padding: 8,
  },
  donateButton: {
    position: "absolute",
    bottom: 200,
    right: 16,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 24,
    padding: 8,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 2,
  },
  notFoundContainer: {
    position: "absolute",
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  notFoundText: {
    color: "white",
    fontWeight: "bold",
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {},
});

export default MainScreen;
