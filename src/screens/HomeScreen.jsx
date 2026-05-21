import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
export default function HomeScreen(token) {
  const [pets, setPets] = useState([]);

  async function petadopt() {
    const response = await fetch('https://petadopt.onrender.com/pet/pets');
    const data = await response.json();

    setPets(data.pets);
  }

  useEffect(function () {
    petadopt();
  }, []);

  function getKey(item) {
    return item._id;
  }

  function renderItem(dados) {
    return renderPet(dados.item);
  }

  function renderPet(item) {
    return (
      <View style={styles.cardPet}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.imagemPet}
          resizeMode="stretch"
        />

        <Text style={styles.textoPet}>Nome: {item.name}</Text>
        <Text style={styles.textoPet}>Raça: {item.breed}</Text>
        <Text style={styles.textoPet}>Idade: {item.age}</Text>
        <Text style={styles.textoPet}>Peso: {item.weight}</Text>
        <Text style={styles.textoPet}>Cor: {item.color}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

       <View style={styles.header}>

        </View>

      <FlatList
        data={pets}
        keyExtractor={getKey}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.linha}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },

  header: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },

  linha: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  cardPet: {
    width: '48%',
    backgroundColor: '#fff', 
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },

  imagemPet: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
  },

  textoPet: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});