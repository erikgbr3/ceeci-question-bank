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
      setRooms(roomsData);
      fetchBanks(roomsData);
    } catch (error) {
      console.error('Error al buscar las salas del maestro:', error);
    }
  };

  const fetchBanks = async (roomId) => {
    try {
       const allBanks = await Promise.all(
      rooms.map(async (room) => {
        const banksData = await ResultController.getResult(room.id);
        return banksData.map(result => ({ ...result, isDropdownOpen: false }));
      })
    );
    setResults(allBanks.flat());
    } catch (error) {
      console.error('Error al buscar los resultados:', error);
    }
  }
  const handleRefresh = async () => {
    console.log('Refrescando preguntas...');
    setIsRefreshing(true);
    try {
      fetchRoomsMaster(user.id);
      fetchBanks(rooms.id);
    } catch (error) {
      console.error('Error al refrescar las salas:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoomsMaster(user.id);
    }, [])
  );

  useEffect(() => {
    if (rooms.length > 0) {
      fetchBanks(rooms);
    }
  }, [rooms]);

  return (
    <View style={styles.container}>
    <View style={styles.container2}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {results.map((result, index) => (
        <View key={index}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleDropdown(index)}>
              <View>
                <Text style={styles.title}>{result.name}</Text>
              </View>
            </TouchableOpacity>      
          </View>
          {result.BankQuestion.map((question, idx) => (
            result.isDropdownOpen && (
              <View key={idx} style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => toggleSDropdown(index, idx)}>
                  <View>
                    <Text style={styles.title2}>{question.textQuestion}</Text>
                  </View>
                </TouchableOpacity>
                {question.QuestionOption.map((option, id) => (
                  <View key={id}>
                    {question.QuestionAnswer.map((answer, i) => (
                      question.isSDropdownOpen && (
                        <View key={i}>
                          <ResultCard
                          option={option}
                          answer={answer}
                          />
                        </View>
                      )
                    ))}
                  </View> 
                ))}  
              </View>
            )
          ))}
          <View style={styles.footer}></View>
        </View>
      ))}
      </ScrollView>    
    </View>
    </View>
  )
}

export default ResultView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E78EE'
  },
  container2:{
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  card: {
    backgroundColor: '#c797da',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  footer: {
    minHeight: 40,
    backgroundColor: '#c797da',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderColor: 'grey',
    borderWidth: .1,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: '#b0c2f2',
    borderColor: 'grey',
    borderWidth: .1,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 1,
    marginBottom: 1,
  },
})