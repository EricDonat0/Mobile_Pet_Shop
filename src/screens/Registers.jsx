import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Register({ navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }
    Alert.alert('Sucesso', 'Conta criada!');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Botão de Tema no Topo */}
      <TouchableOpacity style={styles.themeToggleAuth} onPress={theme.toggleTheme}>
        <Text style={{ fontSize: 24 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Criar Conta</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Junte-se à nossa comunidade</Text>

        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="Nome completo" placeholderTextColor={theme.colors.textSecondary} value={name} onChangeText={setName} />
        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="E-mail" placeholderTextColor={theme.colors.textSecondary} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="Telefone" placeholderTextColor={theme.colors.textSecondary} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="Senha" placeholderTextColor={theme.colors.textSecondary} secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="Confirme sua Senha" placeholderTextColor={theme.colors.textSecondary} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.linkText, { color: theme.colors.textSecondary }]}>Já tem uma conta? <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Faça Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  themeToggleAuth: { position: 'absolute', top: 20, right: 20, zIndex: 10, padding: 10 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 10, padding: 16, fontSize: 16, marginBottom: 16 },
  primaryButton: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  linkButton: { marginTop: 24, alignItems: 'center' },
  linkText: { fontSize: 14 },
});