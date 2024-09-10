import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Add a new task
  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, taskText]);
    setTaskText('');
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Start editing a task
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index]);
  };

  // Save edited task
  const saveEdit = () => {
    if (editText.trim() === '') return;
    const updatedTasks = tasks.map((task, i) => (i === editingIndex ? editText : task));
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={addTask} />

      {editingIndex !== null && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit task"
            value={editText}
            onChangeText={setEditText}
          />
          <Button title="Save" onPress={saveEdit} />
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => startEdit(index)} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(index)} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  editContainer: {
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;
