import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './src/contexts/ThemeContext';

import Register from './src/screens/Registers';
import Login from './src/screens/Logins';
import HomeScreen from './src/screens/HomeScreen';
import CreatePet from './src/screens/CreatePet';
import MyPets from './src/screens/MyPets';
import PetDetails from './src/screens/PetDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePet" component={CreatePet} options={{ headerShown: false }} />
            <Stack.Screen name="MyPets" component={MyPets} options={{ headerShown: false }} />
            <Stack.Screen name="PetDetails" component={PetDetails} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}