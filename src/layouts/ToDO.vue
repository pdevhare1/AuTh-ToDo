<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="95">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer()" /> -->
        <q-toolbar-title clickable class="text-h5 text-bold" to="/todo">
          <q-avatar rounded>
            <img src="../assets/logo.png" />
          </q-avatar>
          TODO
        </q-toolbar-title>
        <q-btn clickable flat icon="logout" @click="logout" />
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/" label="Sign In" />
        <q-route-tab to="/todo" label="Todo" />
        <q-route-tab to="/SignUp" label="SignUp" />
      </q-tabs>
    </q-header>
    <!-- <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="Desktop"
    >
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
    </q-drawer> -->
    <q-page-container align="center">
      <div class="col items-start" style="width: 40rem">
        <q-input
          v-model="newTodo.text"
          rounded
          standout
          filled
          color="lime-11"
          bg-color="green"
          bottom-slots
          label="Add Todo"
          class="q-my-md"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
          <template v-slot:append>
            <q-btn @click="addTodo" round dense flat icon="add" />
          </template>
        </q-input>

        <q-input
          v-model="newTodo.description"
          rounded
          standout
          filled
          color="lime-11"
          bg-color="green"
          bottom-slots
          label="Short Description"
          class="q-my-md"
        >
          <template v-slot:prepend>
            <q-icon name="subject" />
          </template>
        </q-input>

        <q-card
          v-for="todo in todoStore.todos"
          :key="todo.id"
          class="my-card bg-primary text-white q-pa-sm q-mb-md"
        >
          <q-card-section class="row" :class="{ completed: todo.completed }">
            <div class="col">
              <div class="text-h6">{{ todo.text }}</div>
              <div class="text-subtitle">{{ todo.description }}</div>
              <div class="text-caption">{{ formatTime(todo.time) }}</div>
            </div>
            <div class="row absolute-right q-gutter-md" size="2px">
              <q-btn
                v-if="!todo.completed"
                @click="markAsCompleted(todo.id)"
                outline
                color="green"
                icon="check"
                size="xs"
              />
              <q-btn
                @click="removeTodo(todo.id)"
                outline
                color="red"
                icon="close"
                size="xs"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>


<script>
import { ref, onMounted } from "vue";
import { useTodoStore } from "../stores/todo";
import { useRouter } from "vue-router";

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref({ text: "", description: "" });
    const router = useRouter();

    function addTodo() {
      if (newTodo.value.text.trim()) {
        todoStore.addTodo({
          text: newTodo.value.text.trim(),
          description: newTodo.value.description.trim(),
        });
        newTodo.value.text = "";
        newTodo.value.description = "";
      }
    }

    function markAsCompleted(todoId) {
      todoStore.markAsCompleted(todoId);
    }

    function removeTodo(todoId) {
      todoStore.removeTodo(todoId);
    }

    function formatTime(timeString) {
      const time = new Date(timeString);
      return time.toLocaleString();
    }

    function logout() {
      localStorage.removeItem("authToken");
      router.push("/"); // Use router.push instead of this.$router.push
    }

    // Use onMounted to check for authToken after the component is mounted
    onMounted(() => {
      // Check if authToken is not present and redirect to login page
      if (!localStorage.getItem("authToken")) {
        router.push("/");
      }
    });

    return {
      todoStore,
      newTodo,
      addTodo,
      markAsCompleted,
      removeTodo,
      formatTime,
      logout,
    };
  },
};
</script>
