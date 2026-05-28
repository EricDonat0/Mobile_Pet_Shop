import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'; 
import { useTheme } from '../contexts/ThemeContext';

export default function HomeScreen({ route, navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = route?.params?.token;
  const { theme } = useTheme();

  useFocusEffect(useCallback(() => {
    async function petadopt() {
      try {
        const response = await fetch('https://petadopt.onrender.com/pet/pets');
        const data = await response.json();
        setPets(data.pets);
      } catch (error) {
        console.log("Erro ao buscar pets:", error);
      } finally {
        setLoading(false);
      }
    }
    petadopt();
  }, []));

  function handleLogout() {
    const executaLogout = () => { navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); };
    if (Platform.OS === 'web') {
      if (window.confirm("Tem certeza que deseja sair da sua conta?")) executaLogout();
    } else {
      Alert.alert("Sair", "Tem certeza que deseja sair?", [{ text: "Cancelar", style: "cancel" }, { text: "Sair", style: "destructive", onPress: executaLogout }]);
    }
  }

  function renderPet({ item }) {
    return (
      <TouchableOpacity style={[styles.cardPet, { backgroundColor: theme.colors.surface }]} activeOpacity={0.9} onPress={() => navigation.navigate('PetDetails', { pet: item })}>
        <View style={styles.imagemPetContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.imagemFundoBlur} resizeMode="cover" blurRadius={20} />
          <Image source={{ uri: item.images[0] }} style={styles.imagemPetPrincipal} resizeMode="contain" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.nomePet, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.racaPet, { color: theme.colors.textSecondary }]} numberOfLines={1}>{item.breed}</Text>
          <View style={styles.rowInfo}>
            <Text style={[styles.detalhePet, { color: theme.colors.textSecondary }]}>{item.age} anos</Text>
            <Text style={[styles.pontoSeparador, { color: theme.colors.textSecondary }]}>•</Text>
            <Text style={[styles.detalhePet, { color: theme.colors.textSecondary }]}>{item.weight} kg</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Adote um Amigo 🐾</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Encontre o pet ideal</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity style={[styles.themeToggle, { borderColor: theme.colors.border }]} onPress={theme.toggleTheme}>
            <Text style={{ fontSize: 18 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.logoutButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.primary} /></View>
      ) : (
        <FlatList data={pets} keyExtractor={(item) => String(item._id)} renderItem={renderPet} numColumns={2} columnWrapperStyle={styles.linha} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }} />
      )}

      <TouchableOpacity style={[styles.fabButtonSecondary, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} onPress={() => navigation.navigate('MyPets', { token: token })} activeOpacity={0.8}>
        <Text style={styles.fabTextSecondary}>🐶</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fabButton, { backgroundColor: theme.colors.primary }]} onPress={() => navigation.navigate('CreatePet', { token: token })} activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 25 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 16, marginTop: 6 },
  themeToggle: { padding: 6, borderRadius: 8, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  logoutButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1 },
  logoutText: { color: '#F44336', fontWeight: 'bold', fontSize: 14 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  linha: { justifyContent: 'space-between', marginBottom: 16 },
  cardPet: { width: '48%', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  imagemPetContainer: { width: '100%', height: 150, backgroundColor: '#111', position: 'relative', justifyContent: 'center', alignItems: 'center' },
  imagemFundoBlur: { ...StyleSheet.absoluteFillObject, opacity: 0.6 },
  imagemPetPrincipal: { width: '100%', height: '100%' },
  infoContainer: { padding: 12 },
  nomePet: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  racaPet: { fontSize: 14, marginBottom: 10 },
  rowInfo: { flexDirection: 'row', alignItems: 'center' },
  detalhePet: { fontSize: 12, fontWeight: '600' },
  pontoSeparador: { fontSize: 12, marginHorizontal: 6 },
  fabButton: { position: 'absolute', bottom: 24, right: 24, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8, zIndex: 2 },
  fabText: { fontSize: 32, color: '#FFFFFF', fontWeight: '300', marginTop: -2 },
  fabButtonSecondary: { position: 'absolute', bottom: 100, right: 29, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8, borderWidth: 1, zIndex: 1 },
  fabTextSecondary: { fontSize: 22 },
});