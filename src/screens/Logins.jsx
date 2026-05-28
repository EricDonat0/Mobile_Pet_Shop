import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Login({ navigation }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha seu e-mail e senha.');
      return;
    }

    try {
      const response = await fetch('https://petadopt.onrender.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('HomeScreen', { token: data.token });
      } else {
        Alert.alert('Ops!', data.message || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Botão de Tema no Topo */}
      <TouchableOpacity style={styles.themeToggleAuth} onPress={theme.toggleTheme}>
        <Text style={{ fontSize: 24 }}>{theme.isDarkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Bem-vindo de volta!</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Faça login para continuar</Text>

        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="E-mail" placeholderTextColor={theme.colors.textSecondary} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]} placeholder="Senha" placeholderTextColor={theme.colors.textSecondary} secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.linkText, { color: theme.colors.textSecondary }]}>Ainda não tem conta? <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Cadastre-se</Text></Text>
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