import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
    return <Text style={styles.userId}>{field}: {editedOption[field]}</Text>;
  };

  return (
    <View>
      <View style={styles.card}>
        <Text>{option.questionId}</Text>
      </View>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          {renderOptionField('option1')}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          {renderOptionField('option2')}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          {renderOptionField('option3')}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
        <View style={styles.card}>
          {renderOptionField('correctA')}
        </View>
      </TouchableOpacity>
      {isEditing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancel}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <View style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    color: '#555',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    width: 100
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    width: 100
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});

export default OptionCard;
