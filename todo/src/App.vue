<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import NewTodoForm from './components/NewTodoForm.vue';
import TodoCounter from './components/TodoCounter.vue';
import type { TodoCounter as CounterModel, TodoModel } from './models/todoModels';

const currentTime = ref<Date>();

function updateTime() {
  currentTime.value = new Date();
}


onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
},);

const newItem = reactive<TodoModel>({
  name: undefined,
  status: undefined,
  due: undefined
});

const todoCounter = reactive<CounterModel>({
  totalTodo: 0,
  done: 0,
  inProgress: 0
})

function onNewTodoAdded(todo: TodoModel): void {
  newItem.due = todo.due;
  newItem.name = todo.name;
  newItem.status = todo.status;
  todoCounter.totalTodo += 1;
}

</script>

<template>
  <header class="head-banner">
    <p>{{ currentTime }}</p>

  </header>

  <main class="grid grid-rows-6 grid-cols-2 gap-4 pt-10 px-5 mx-2 h-screen w-screen grid-flow-row">
    <NewTodoForm headingStr="New TODO item" class="px-9 mx-1 py-3 my-2 place-content-center row-start-1 row-end-6"
      @submit-new-todo="(todo: TodoModel) => onNewTodoAdded(todo)" />
    <TodoCounter class="py-2 my-1 mx-9 px-4 fixed bottom-1 self-center row-start-6 row-span-1 shadow-lg"
      :totalTodo="todoCounter.totalTodo" :done="todoCounter.done" :inProgress="todoCounter.inProgress" />
    <div class=" row-span-1 row-start-2">02</div>
    <div class=" row-span-2 ">03</div>
  </main>

</template>

<style scoped>
@reference './assets/tw.css';

.head-banner {
  @apply w-screen fixed top-0 right-0 left-0 py-3 px-5 text-center font-bold italic text-blue-700 bg-amber-100 dark:text-amber-200 dark:bg-amber-950;
}
</style>
