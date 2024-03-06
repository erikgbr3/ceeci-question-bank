import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import ResultController from "../../controllers/resultController";
import { AuthContext } from "../../context/AuthContext";
import RoomController from "../../controllers/roomControler";
import ResultCard from "./getResult";

const ResultView = () => {

  const { user } = useContext(AuthContext);

  const [results, setResults] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleDropdown = (index) => {
    setResults(prevResults =>
      prevResults.map((result, i) =>
        i === index ? { ...result, isDropdownOpen: !result.isDropdownOpen } : result
      )
    );
  };

  const toggleSDropdown = (resultIndex, questionIndex) => {
    setResults(prevResults =>
      prevResults.map((result, i) =>
        i === resultIndex ? {
          ...result,
          BankQuestion: result.BankQuestion.map((question, j) =>
            j === questionIndex ? { ...question, isSDropdownOpen: !question.isSDropdownOpen } : question
          )
        } : result
      )
    );
  };

  const fetchRoomsMaster = async (userId) => {
    try {
      const roomsData = await RoomController.getAllRooms(userId);
      console.log('Salas obtenidas:', roomsData);
      if (roomsData.length > 0) {
        fetchBanks(roomsData[0].id); // Suponiendo que solo necesitas el ID de la primera sala
      }
      setRooms(roomsData);
    } catch (error) {
      console.error('Error al buscar las salas del maestro:', error);
    }
  };

  const fetchBanks = async (roomId) => {
    try {
      const questionsData = await ResultController.getResult(roomId);
      console.log('Resultados obtenidos:', questionsData);
      setResults(questionsData.map(result => ({ ...result, isDropdownOpen: false })));
    } catch (error) {
      console.error('Error al buscar los resultados:', error);
    }
  }

  const handleRefresh = async () => {
    console.log('Refrescando preguntas...');
    setIsRefreshing(true);
    try {
      fetchBanks();
    } catch (error) {
      console.error('Error al refrescar las salas:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoomsMaster(user.id);
      fetchBanks(rooms.id);
    }, [])
  );

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {results.map((result, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => toggleDropdown(index)}>
            <View>
              <Text style={styles.title}>{result.name}</Text>
            </View>
          </TouchableOpacity>
          {result.BankQuestion.map((question, idx) => (
            result.isDropdownOpen && (
              <View key={idx} style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => toggleSDropdown(index, idx)}>
                  <View>
                    <Text style={styles.title}>{question.textQuestion}</Text>
                  </View>
                </TouchableOpacity>
                {question.QuestionAnswer.map((answer, i) => (
                  question.isSDropdownOpen && (
                    <View key={i}>
                      <ResultCard
                      answer={answer}
                      />
                    </View>
                  )
                ))}
              </View>
            )
          ))}
        </View>
      ))}
      </ScrollView>    
    </View>
  )
}

export default ResultView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  optionsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 10,
  },
})