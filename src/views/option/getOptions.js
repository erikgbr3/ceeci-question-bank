import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import OptionController from '../../controllers/optionController';

const OptionCard = ({ option, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOption, setEditedOption] = useState(option);
  const [originalOption, setOriginalOption] = useState(option);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { id, option1, option2, option3, correctA } = editedOption;
  
      // Verifica que los campos sean strings
      if (
        typeof option1 !== 'string' ||
        typeof option2 !== 'string' ||
        typeof option3 !== 'string' ||
        typeof correctA !== 'string'
      ) {
        throw new Error('Los campos deben ser strings');
      }
  
      const updateData = await OptionController.updateOption(id, option1, option2, option3, correctA);
      console.log(updateData);
    
      setIsEditing(false);
      return updateData;
    } catch (error) {
      console.error('Error al guardar los cambios: ', error);
    }
  };
  

  const handleCancel = () => {
    setEditedOption(originalOption);
    setIsEditing(false);
  };

  const handleChangeText = (value, field) => {
    setEditedOption({ ...editedOption, [field]: value });
  };

  const renderOptionField = (field) => {
    if (isEditing) {
      return (
        <TextInput
          style={styles.textInput}
          value={editedOption[field]}
          onChangeText={(text) => handleChangeText(text, field)}
        />
      );
    }
    return <Text style={styles.title}>{editedOption[field]}</Text>;
  };

  return (
    <View>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          <View style={styles.titleC}>
            {renderOptionField('option1')}
            <Image
                source={require('../../../assets/x.png')}
                style={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          <View style={styles.titleC}>
            {renderOptionField('option2')}
            <Image
                source={require('../../../assets/x.png')}
                style={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          <View style={styles.titleC}>
            {renderOptionField('option3')}
            <Image
                source={require('../../../assets/x.png')}
                style={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          <View style={styles.titleC}>
            {renderOptionField('correctA')}
            <Image
                source={require('../../../assets/y.png')}
                style={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isEditing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancel}>
            <Button style={styles.button} buttonColor='#6a9eda'>
              <Text style={styles.buttonText}>Cancel</Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Button style={styles.button} buttonColor='#f45572'>
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    minHeight: '18%',
    justifyContent: 'center',
  },
  titleC:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12,    
  },
  image: {
    width: 50,
    height: 50,
  },
  textInput: {
    height: '100%',
    width: '80%',
    borderWidth: .3,
    fontWeight: 'bold',
    borderColor: 'white',
    borderRadius: 12,
    paddingLeft: 12,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
  },  
  buttonText: {
    color: 'black',
    fontSize: 20,
  }, 
});

export default OptionCard;
