import { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { registerUser } from '../Request';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  async function handleRegister() {
    try {
      const data = await registerUser(
        name,
        email,
        password,
        phone,
        confirmpassword
      );

      console.log(data);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');

      navigation.navigate('HomeScreen', {
        token: data.token,
      });
    } catch (error) {
      console.log(error);

      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

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
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmpassword}
        onChangeText={setConfirmpassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botaoRegister}
        onPress={handleRegister}
      >
        <Text style={styles.textoBotaoRegister}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBotaoLogin}>Já tem um cadastro?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
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

  botaoRegister: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotaoRegister: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoLogin: {
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
  },

  textoBotaoLogin: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});