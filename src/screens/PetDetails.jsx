import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

export default function PetDetails({ route, navigation }) {
  const { theme } = useTheme();
  const { pet } = route.params;
  const isAvailable = pet.available === true;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Detalhes</Text>
        
        {/* Botão de Tema no Header */}
        <TouchableOpacity onPress={theme.toggleTheme} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: pet.images[0] }} style={styles.heroBlur} resizeMode="cover" blurRadius={30} />
          <Image source={{ uri: pet.images[0] }} style={styles.heroPrincipal} resizeMode="contain" />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.petName, { color: theme.colors.text }]}>{pet.name}</Text>
            <Text style={styles.genderIcon}>{pet.gender === 'male' ? '♂️' : '♀️'}</Text>
          </View>
          
          <Text style={[styles.petBreed, { color: theme.colors.textSecondary }]}>{pet.breed}</Text>

          <View style={[styles.statusBadge, isAvailable ? styles.badgeAvailable : styles.badgeAdopted]}>
            <Text style={[styles.statusText, isAvailable ? styles.textAvailable : styles.textAdopted]}>
              {isAvailable ? '✅ Disponível para Adoção' : '❌ Já Adotado'}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Idade</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>{pet.age} anos</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Peso</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>{pet.weight} kg</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Cor</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]} numberOfLines={1}>{pet.color}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>História</Text>
          <Text style={[styles.storyText, { color: theme.colors.textSecondary }]}>{pet.story || "Sem história registrada."}</Text>

          <TouchableOpacity style={[styles.adoptButton, !isAvailable && { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1 }]} activeOpacity={isAvailable ? 0.8 : 1}>
            <Text style={[styles.adoptButtonText, !isAvailable && { color: theme.colors.textSecondary }]}>
              {isAvailable ? 'Quero Adotar! ❤️' : 'Indisponível'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 15, borderBottomWidth: 1 },
  backButton: { paddingVertical: 8, width: 60 },
  backButtonText: { fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  heroContainer: { width: '100%', height: 350, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  heroBlur: { ...StyleSheet.absoluteFillObject, opacity: 0.5 },
  heroPrincipal: { width: '100%', height: '100%' },
  contentContainer: { padding: 24, paddingBottom: 40 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  petName: { fontSize: 32, fontWeight: 'bold' },
  genderIcon: { fontSize: 24 },
  petBreed: { fontSize: 18, marginTop: 4, marginBottom: 12 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginBottom: 24, borderWidth: 1 },
  badgeAvailable: { backgroundColor: 'rgba(76, 175, 80, 0.1)', borderColor: '#4CAF50' },
  badgeAdopted: { backgroundColor: 'rgba(244, 67, 54, 0.1)', borderColor: '#F44336' },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  textAvailable: { color: '#4CAF50' },
  textAdopted: { color: '#F44336' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: { borderRadius: 12, padding: 16, alignItems: 'center', width: '31%', borderWidth: 1 },
  statLabel: { fontSize: 12, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  storyText: { fontSize: 16, lineHeight: 24, marginBottom: 40 },
  adoptButton: { backgroundColor: '#2196F3', paddingVertical: 18, borderRadius: 12, alignItems: 'center', elevation: 8 },
  adoptButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});