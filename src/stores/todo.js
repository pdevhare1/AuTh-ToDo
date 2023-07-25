import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todos: [],
  }),
  actions: {
    async addTodo({ text, description }) {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        description,
        time: new Date().toISOString(),
        completed: false,
      };

      try {
        await axios.post(
          "https://myproject-bc18e-default-rtdb.firebaseio.com/todos.json",
          newTodo
        );
        this.todos.push(newTodo);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    async markAsCompleted(todoId) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex !== -1) {
        try {
          await axios.patch(
            `https://myproject-bc18e-default-rtdb.firebaseio.com/todos/${todoId}.json`,
            { completed: true }
          );
          this.todos[todoIndex].completed = true;
        } catch (error) {
          console.error("Error marking todo as completed:", error);
        }
      }
    },
    async removeTodo(todoId) {
      try {
        await axios.delete(
          `https://myproject-bc18e-default-rtdb.firebaseio.com/todos/${todoId}.json`
        );
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      } catch (error) {
        console.error("Error removing todo:", error);
      }
    },
  },
});
