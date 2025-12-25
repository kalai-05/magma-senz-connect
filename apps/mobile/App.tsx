import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { Login } from "./src/screens/Login";
import { Signup } from "./src/screens/Signup";
import { FarmerHome } from "./src/screens/FarmerHome";
import { BuyerHome } from "./src/screens/BuyerHome";
import { AddProduct } from "./src/screens/AddProduct";
import { AddDemand } from "./src/screens/AddDemand";
import { MyProducts } from "./src/screens/MyProducts";
import { MyDemands } from "./src/screens/MyDemands";
import { ApprovedMatches } from "./src/screens/ApprovedMatches";
import { Profile } from "./src/screens/Profile";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const AuthedStack = () => {
  const { profile } = useAuth();

  if (!profile) {
    return null;
  }

  return (
    <Stack.Navigator>
      {profile.role === "farmer" ? (
        <>
          <Stack.Screen name="FarmerHome" component={FarmerHome} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="MyProducts" component={MyProducts} />
        </>
      ) : (
        <>
          <Stack.Screen name="BuyerHome" component={BuyerHome} />
          <Stack.Screen name="AddDemand" component={AddDemand} />
          <Stack.Screen name="MyDemands" component={MyDemands} />
        </>
      )}
      <Stack.Screen name="Matches" component={ApprovedMatches} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Root = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Home"
          component={AuthedStack}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}
