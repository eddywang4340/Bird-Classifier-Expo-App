import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleButtonClick = () => {
    if (text.length > 0) {
      let newTodo;
      const todo = todos[todos.length - 1];
      if (!todo) {
        newTodo = { id: 1, text, completed: false };
      } else {
        const id = todo.id + 1;
        newTodo = { id, text, completed: false };
      }
      setTodos([...todos, newTodo]);
      setText('')
    } 
  }
  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }
  const completeTodo = (id) => {
    const newTodo = todos.map(todo => {
      if (todo.id !== id) {
        return todo
      } else {
        return { ...todo, completed: !todo.completed }
      }
    })
    setTodos(newTodo)
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemTodo}>
      <Text style={[styles.item, item.completed ? styles.lineThrough : null]}>
        {item.text}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => completeTodo(item.id)}>
          <Text style={styles.complete}>&#x2713;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.delete}>&#x2715;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space} />
      <Text style={styles.caption}>Add Todo Items</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatlist}
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //all styles here
});
export default App;