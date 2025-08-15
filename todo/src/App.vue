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
  todoCounter.totalTodo = listOfTodos.value.push(todo); // add new item to list, this returns new length

  if (todo.status == TodoStatus.done) {
    todoCounter.done += 1;
  } else if (todo.status == TodoStatus.inProgress) {
    todoCounter.inProgress += 1;
  }
}
</script>

<template>
  <header class="head-banner">
    <p>{{ currentTime }}</p>
  </header>

  <main
    class="flex justify-evenly space-x-1 flex-col pt-20 px-5 mx-2 md:grid md:grid-rows-6 md:grid-cols-2 md:gap-4 sm:h-screen md:grid-flow-row"
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
      v-for="todo in listOfTodos.values()"
      class="flex justify-around flex-row my-4 animate-fade-in-scale"
    >
      <TodoItem v-bind:todo-item="todo" />
    </div>
  </main>
  <footer class="app-version"><span class="select-none">version: </span>{{ appVersion }}</footer>
</template>

<style scoped>
@import './assets/styles/root.css';
</style>
