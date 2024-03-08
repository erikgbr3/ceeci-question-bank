import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import ResultController from "../../controllers/resultController";
import { AuthContext } from "../../context/AuthContext";
import RoomController from "../../controllers/roomControler";
import ResultCard from "./getResult";
import ResultCardUser from "./getResultUser";

const ResultView = () => {

  const { user } = useContext(AuthContext);

  const [results, setResults] = useState([]);
  const [resultsUser, setResultsUser] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomsUser, setRoomsUser] = useState([]);
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

  const toggleDropdownUser = (index) => {
    setResultsUser(prevResults =>
      prevResults.map((result, i) =>
        i === index ? { ...result, isDropdownOpen: !result.isDropdownOpen } : result
      )
    );
  };

  const toggleSDropdownUser = (resultIndex, questionIndex) => {
    setResultsUser(prevResults =>
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

  const fetchRoomsUser = async () => {
    try {
      const roomsData = await RoomController.getAllRoomsAdmin();
      setRoomsUser(roomsData);
    } catch (error) {
      console.error('Error al busacar las salas:', error);
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

  const fetchBanksUser = async (roomId) => {
    try {
      const allBanks = await Promise.all(
        roomsUser.map(async (room) => {
          const banksData = await ResultController.getResult(room.id);
          return banksData.map(result => ({ ...result, isDropdownOpen: false }));
        })
      );
      console.log('Bancos Obtenidos:', allBanks);
      setResultsUser(allBanks.flat());
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
      fetchRoomsUser();
    }, [])
  );

  useEffect(() => {
    if (rooms.length > 0) {
      fetchBanks(rooms);
    }
  }, [rooms]);

  useEffect(() => {
    if (roomsUser.length > 0) {
      fetchBanksUser(roomsUser);
    }
  }, [roomsUser]);

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
        {user.rol === 'maestro' && (
          <View>
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
                    <Text style={styles.title}>{question.textQuestion}</Text>
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
        </View>
      ))}
        </View>
        )}

        {user.rol === 'usuario' && (
          <View>
           {resultsUser.map((result, index) => (
              <View key={index}>
                  <View style={styles.card}>
                      <TouchableOpacity onPress={() => toggleDropdownUser(index)}>
                          <View>
                              <Text style={styles.title}>{result.name}</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {result.BankQuestion && result.BankQuestion.map((question, idx) => (
                      result.isDropdownOpen && (
                          <View key={idx} style={styles.optionsContainer}>
                              <TouchableOpacity onPress={() => toggleSDropdownUser(index, idx)}>
                                  <View>
                                      <Text style={styles.title}>{question.textQuestion}</Text>
                                  </View>
                              </TouchableOpacity>
                              {question.QuestionOption.map((option, id) => (
                                  <View key={id}>
                                      {question.QuestionAnswer.filter(answer => answer.userId === user.id).map((filteredAnswer, i) => (
                                          question.isSDropdownOpen && (
                                              <View key={i}>
                                                  <ResultCardUser
                                                      option={option}
                                                      answer={filteredAnswer}
                                                  />
                                              </View>
                                          )
                                      ))}
                                  </View>
                              ))}
                          </View>
                      )
                  ))}
              </View>
          ))}
        </View>
        )}
         
      </ScrollView>    
    </View>
  )
}

export default ResultView;

const styles = StyleSheet.create({
  card: {
    borderColor: 'grey',
    borderWidth: .4,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    marginRight: 10,
    borderTopWidth: 1,
    borderColor: '#60AEDB',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#60AEDB',
    width: '100%',
  },
})