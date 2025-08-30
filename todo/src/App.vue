<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import NewTodoForm from './components/NewTodoForm.vue';
import TodoCounter from './components/TodoCounter.vue';
import { TodoStatus, type TodoCounter as CounterModel, type TodoModel } from './models/todoModels';
import TodoItem from './components/TodoItem.vue';

import { getCurrentInstance } from 'vue';

const appVersion: string = getCurrentInstance()?.appContext.config.globalProperties.versionNumber;

const currentTime = ref<Date>();

function updateTime() {
  currentTime.value = new Date();
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

const listOfTodos = ref<[TodoModel?]>([]);

const todoCounter = reactive<CounterModel>({
  totalTodo: 0,
  done: 0,
  inProgress: 0,
});

function onNewTodoAdded(todo: TodoModel): void {
  todoCounter.totalTodo = listOfTodos.value.push(todo); // add new item to list, this returns new length.

  if (todo.status == TodoStatus.done) {
    todoCounter.done += 1;
  } else if (todo.status == TodoStatus.inProgress || todo.status == undefined) {
    todoCounter.inProgress += 1;
  }
}
</script>

<template>
  <header class="head-banner">
    <p>{{ currentTime }}</p>
  </header>

  <main
    class="flex flex-col justify-center-safe items-center pt-20 md:flex-row md:gap-18 pb-28 mb-12"
  >
    <NewTodoForm
      headingStr="New TODO item"
      class="form-wrapper-layout"
      @submit-new-todo="(todo: TodoModel) => onNewTodoAdded(todo)"
    />
    <TodoCounter
      class="bottom-left-counter-layout"
      :totalTodo="todoCounter.totalTodo"
      :done="todoCounter.done"
      :inProgress="todoCounter.inProgress"
    />
    <div
      v-if="listOfTodos.length > 0"
      class="relative flex w-65 md:h-150 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto scroll-smooth snap-x md:snap-y snap-mandatory rounded-2xl shadow-md bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-700 dark:to-lime-800 p-4 mb-12"
    >
      <div class="flex flex-row md:flex-col gap-4">
        <div
          v-for="todo in listOfTodos"
          class="flex-shrink-0 md:flex-shrink snap-start p-5 rounded-xl shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur-md hover:scale-105 transition-transform duration-300"
        >
          <TodoItem v-bind:todo-item="todo" class="bg-transparent animate-fade-in-scale" />
        </div>
      </div>
    </div>
  </main>
  <footer class="app-version"><span class="select-none">version: </span>{{ appVersion }}</footer>
</template>

<style scoped>
@import './assets/styles/root.css';
/* For WebKit-based browsers */
::-webkit-scrollbar {
  display: none;
}

/* For Firefox */
html {
  scrollbar-width: none;
}

/* For legacy Edge/IE */
body {
  -ms-overflow-style: none;
}
</style>
