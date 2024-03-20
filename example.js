import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackendConfig from './database/backend/config';

const YourComponent = () => {
  const [cardName, setCardName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permisos insuficientes', 'Se necesita permiso para acceder a la galería de imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('cardName', cardName);

      // Si imageUri está definido, agrega la imagen al formData
      if (imageUri) {
        const localUri = imageUri;
        const filename = localUri.split('/').pop();

        // Agrega el archivo al formData
        formData.append('image', {
          uri: localUri,
          name: filename,
          type: 'image/jpg', // Modifica el tipo de archivo según corresponda
        });
      }

      const response = await fetch(`${BackendConfig.url}/api/card`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Manejar el error
    }
  };

  return (
    <View>
      <TextInput
        style={styles.text}
        placeholder="Nombre de la tarjeta"
        value={cardName}
        onChangeText={setCardName}
      />
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 200,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    color: 'white',
    margin: 40,
    padding: 10,
  }
});

export default YourComponent;



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// import BackendConfig from './database/backend/config';

// const YourComponent = () => {
//   const [cards, setCards] = useState([]);

//   // Función para obtener los datos de las tarjetas desde el servidor
//   const fetchCards = async () => {
//     try {
//       const response = await fetch(`${BackendConfig.url}/api/card`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCards(data); // Actualiza el estado con los datos obtenidos del servidor
//     } catch (error) {
//       console.error('Error al obtener las tarjetas:', error);
//       // Manejar el error
//     }
//   };

//   // Llama a fetchCards cuando el componente se monta
//   useEffect(() => {
//     fetchCards();
//   }, []);

//   // Renderiza cada tarjeta en la lista
//   const renderItem = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <Text style={styles.cardName}>{item.nameCard}</Text>
//       <Image source={{ uri: item.image_path }} style={styles.cardImage} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cards}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()} // Asume que cada tarjeta tiene un campo 'id'
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   cardName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   cardImage: {
//     width: 200,
//     height: 200,
//   },
// });

// export default YourComponent;
