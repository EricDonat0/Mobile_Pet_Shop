import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

export default function CreatePet({ route, navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState('');
  const [story, setStory] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  const token = route?.params?.token;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://petadopt.onrender.com/pet/category');
        const data = await response.json();
        setCategories(data.categories || data);
      } catch (error) {
        console.log("Erro ao buscar categorias:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  async function handleCreatePet() {
    // 1. Verificação de Segurança do Token
    if (!token) {
      if (Platform.OS === 'web') window.alert('Sessão inválida. Faça login novamente.');
      else Alert.alert('Erro', 'Sessão inválida. Faça login novamente.');
      return;
    }
    const imagemFinal = imageUrl === '' ? '""' : imageUrl;

    // 2. Verificação de Campos Obrigatórios
    if (!name || !breed || !selectedCategoryId) {
      if (Platform.OS === 'web') window.alert('Atenção: Preencha o nome, raça, URL da foto e escolha uma categoria.');
      else Alert.alert('Atenção', 'Preencha os campos principais e escolha uma categoria.');
      return;
    }

    try {
      // 3. Tratamento de conversão para evitar o envio de "NaN" ao banco de dados
      const payload = {
        name,
        breed,
        gender,
        age: parseInt(age, 10) || 0, // Se estiver vazio, envia 0
        weight: parseFloat(weight.replace(',', '.')) || 0, // Se estiver vazio, envia 0
        color,
        story,
        available: true,
        category: selectedCategoryId,
        images: [imagemFinal]
      };

      const response = await fetch('https://petadopt.onrender.com/pet/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      // 4. Verificando a resposta do servidor
      if (response.ok || response.status === 201) {
        if (Platform.OS === 'web') window.alert('Sucesso! 🎉 Seu pet foi cadastrado.');
        else Alert.alert('Sucesso! 🎉', 'Seu pet foi cadastrado e já está disponível para adoção.');
        
        navigation.goBack(); // Volta para a tela anterior
      } else {
        const data = await response.json();
        const errorMessage = data.message || JSON.stringify(data);
        
        if (Platform.OS === 'web') window.alert('Erro da API: ' + errorMessage);
        else Alert.alert('Erro', errorMessage);
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      if (Platform.OS === 'web') window.alert('Erro de Conexão. O servidor pode estar dormindo (Render).');
      else Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Novo Pet</Text>
        
        {/* Botão de Tema no Header */}
        <TouchableOpacity onPress={theme.toggleTheme} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.label, { color: theme.colors.text }]}>Nome do Pet</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
          placeholder="Ex: Rex, Floquinho, Luna..." 
          placeholderTextColor={theme.colors.textSecondary} 
          value={name} 
          onChangeText={setName} 
        />

        {/* BOTÕES DE CATEGORIA */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Categoria</Text>
        {loadingCategories ? (
          <ActivityIndicator size="small" color={theme.colors.primary} style={{ alignSelf: 'flex-start', marginVertical: 10 }} />
        ) : (
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat._id} 
                onPress={() => setSelectedCategoryId(cat._id)} 
                style={[
                  styles.categoryButton, 
                  { 
                    backgroundColor: selectedCategoryId === cat._id ? theme.colors.primary : theme.colors.surface, 
                    borderColor: selectedCategoryId === cat._id ? theme.colors.primary : theme.colors.border 
                  }
                ]}
              >
                <Text style={{ 
                  color: selectedCategoryId === cat._id ? '#FFFFFF' : theme.colors.textSecondary, 
                  fontWeight: 'bold',
                  fontSize: 14
                }}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Raça</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
              placeholder="Ex: Vira-lata, Poodle..." 
              placeholderTextColor={theme.colors.textSecondary} 
              value={breed} 
              onChangeText={setBreed} 
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Gênero</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
              placeholder="male ou female" 
              placeholderTextColor={theme.colors.textSecondary} 
              value={gender} 
              onChangeText={setGender} 
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Idade</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
              placeholder="Ex: 3" 
              placeholderTextColor={theme.colors.textSecondary} 
              keyboardType="numeric" 
              value={age} 
              onChangeText={setAge} 
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Peso (kg)</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
              placeholder="Ex: 4.5" 
              placeholderTextColor={theme.colors.textSecondary} 
              keyboardType="numeric" 
              value={weight} 
              onChangeText={setWeight} 
            />
          </View>
        </View>

        <Text style={[styles.label, { color: theme.colors.text }]}>Cor</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
          placeholder="Ex: Caramelo, Preto e Branco..." 
          placeholderTextColor={theme.colors.textSecondary} 
          value={color} 
          onChangeText={setColor} 
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>História</Text>
        <TextInput 
          style={[styles.input, styles.textArea, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
          placeholder="Conte um pouco sobre a personalidade e a história desse amiguinho..." 
          placeholderTextColor={theme.colors.textSecondary} 
          multiline 
          numberOfLines={4} 
          value={story} 
          onChangeText={setStory} 
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>URL da Foto</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} 
          placeholder="Ex: https://site.com/foto-do-pet.jpg" 
          placeholderTextColor={theme.colors.textSecondary} 
          value={imageUrl} 
          onChangeText={setImageUrl} 
        />

        <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.colors.primary }]} onPress={handleCreatePet}>
          <Text style={styles.submitButtonText}>Cadastrar Pet</Text>
        </TouchableOpacity>
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
  formContainer: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderRadius: 10, padding: 14, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputGroup: { width: '48%' },
  
  // Estilos da área de categorias
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5, marginBottom: 5 },
  categoryButton: { borderWidth: 1, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 18, minWidth: 80, alignItems: 'center' },
  
  submitButton: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 35, elevation: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});