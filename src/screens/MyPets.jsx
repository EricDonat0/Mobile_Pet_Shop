import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'; 
import { useTheme } from '../contexts/ThemeContext';

export default function MyPets({ route, navigation }) {
  const { theme } = useTheme();
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = route?.params?.token;

  useFocusEffect(useCallback(() => {
    async function fetchMyPets() {
      if (!token) return setLoading(false);
      try {
        const response = await fetch('https://petadopt.onrender.com/pet/mypets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setMyPets(data.pets || data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyPets();
  }, []));

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
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Meus Pets</Text>
        
        {/* Botão de Tema no Header */}
        <TouchableOpacity onPress={theme.toggleTheme} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.primary} /></View>
      ) : myPets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emojiVazio}>📭</Text>
          <Text style={[styles.textoVazio, { color: theme.colors.textSecondary }]}>Você ainda não cadastrou nenhum pet.</Text>
        </View>
      ) : (
        <FlatList data={myPets} keyExtractor={(item) => String(item._id)} renderItem={renderPet} numColumns={2} columnWrapperStyle={styles.linha} contentContainerStyle={{ paddingBottom: 40 }} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 15, borderBottomWidth: 1, marginBottom: 10 },
  backButton: { paddingVertical: 8, width: 60 },
  backButtonText: { fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  emojiVazio: { fontSize: 48, marginBottom: 15 },
  textoVazio: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
  linha: { justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 16 },
  cardPet: { width: '48%', borderRadius: 16, overflow: 'hidden', elevation: 8 },
  imagemPetContainer: { width: '100%', height: 150, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  imagemFundoBlur: { ...StyleSheet.absoluteFillObject, opacity: 0.6 },
  imagemPetPrincipal: { width: '100%', height: '100%' },
  infoContainer: { padding: 12 },
  nomePet: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  racaPet: { fontSize: 14 },
});