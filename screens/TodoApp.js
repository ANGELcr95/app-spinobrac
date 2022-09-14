import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Layout from "../components/Layouts/Layout";
import { addTodo } from "../redux/todoSlice";

export const TodoApp = () => {

    const [text, setText] = useState();
  const dispatch = useDispatch();

  function handleSumbit(){
    dispatch(addTodo(text));
    setText('');
  }
  const todos = useSelector((state) => state.todos);

 
  
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <View style={styles.container}>
        <TextInput placeholder="Todo" value={text} onChangeText={setText} style={styles.input} />
        <TouchableOpacity title="Add" onPress={handleSumbit}>
        <Text style={styles.title}>Todo </Text>

        </TouchableOpacity>
      </View>
      {todos.map((todo, index) => (
          <Text  key={todo.id}>{`${index + 1}. ${
            todo.text
          }`}</Text>
        ))}
    </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});