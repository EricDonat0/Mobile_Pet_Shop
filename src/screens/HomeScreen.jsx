import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
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
  },

  linha: {
    justifyContent: 'space-between',
  },

  cardPet: {
    width: '48%',
    marginBottom: 25,
    alignItems: 'center',
  },

  imagemPet: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  textoPet: {
    textAlign: 'center',
  },
});