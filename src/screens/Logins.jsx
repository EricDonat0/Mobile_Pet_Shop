import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../Request';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const data = await loginUser(
        email,
        password,
      );

      console.log(data);
      Alert.alert('Sucesso', 'Usuário logado com sucesso!');

      navigation.navigate('HomeScreen', {
        token: data.token,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível encontrar o usuário.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />


      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
              style={styles.botaoLogin}
              onPress={handleLogin}
            >
              <Text style={styles.textoBotaoLogin}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
              style={styles.botaoCadastro}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.textoBotaoCadastro}>Não tem um cadastro?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  botaoLogin: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotaoLogin: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoCadastro: {
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
  },

  textoBotaoCadastro: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});