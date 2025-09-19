<script setup lang="ts">
import { ref, onMounted, reactive, watch, provide, getCurrentInstance } from 'vue';
import NewTodoForm from './components/NewTodoForm.vue';
import TodoCounter from './components/TodoCounter.vue';
import {
  todoAsMapStr,
  TodoStatus,
  type TodoCounter as CounterModel,
  type TodoModel,
} from './models/todoModels';
import TodoItem from './components/TodoItem.vue';
import TodoPopPanel from './components/TodoPopPanel.vue';

const appVersion: string = getCurrentInstance()?.appContext.config.globalProperties.versionNumber;

const currentTime = ref<Date>();

function updateTime() {
  currentTime.value = new Date();
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

const IdTracker = ref<number>(-1);

const listOfTodos = ref<[TodoModel?]>([]);

const todoCounter = reactive<CounterModel>({
  totalTodo: 0,
  done: 0,
  inProgress: 0,
});

const currentSelectedTodoId = ref<number>(-1);

provide('todoId', IdTracker);

function onNewTodoAdded(todo: TodoModel): void {
  todoCounter.totalTodo = listOfTodos.value.push(todo); // add new item to list, this returns new length.

  if (todo.status == TodoStatus.done) {
    todoCounter.done += 1;
  } else if (todo.status == TodoStatus.inProgress || todo.status == undefined) {
    todoCounter.inProgress += 1;
  }
}

function delAtId(id: number) {
  const index = listOfTodos.value.findIndex((item) => {
    item?.todoId == id;
  });
  const isDone = listOfTodos.value[index]?.status == TodoStatus.done;
  const deleted = listOfTodos.value.splice(index - 1, 1);
  if (deleted.length == 1) {
    console.log(`deleted: ${todoAsMapStr(deleted[0]!)}`);
    todoCounter.totalTodo -= 1;
  }
  if (isDone && todoCounter.done > 0) {
    todoCounter.done -= 1;
  } else if (!isDone && todoCounter.inProgress > 0) {
    todoCounter.inProgress -= 1;
  }
}

function syncTodoForPanelAndShowIt(todoId: number) {
  currentSelectedTodoId.value = todoId;
  console.log(`selected ${todoId}`);
}

watch(todoCounter, () => {
  console.assert(todoCounter.totalTodo == todoCounter.done + todoCounter.inProgress);
});
</script>

<template>
  <header class="head-banner">
    <p>{{ currentTime }}</p>
  </header>
  <TodoPopPanel
    v-show="currentSelectedTodoId > -1 ? true : false"
    @btn1-click="currentSelectedTodoId = -1"
    class="popup-panel"
    :panel-title="listOfTodos.filter((td) => td?.todoId == currentSelectedTodoId)[0]?.name"
    :panel-desc="listOfTodos.filter((td) => td?.todoId == currentSelectedTodoId)[0]?.desc"
  />

  <main
    class="flex flex-col justify-center-safe items-center pt-15 md:px-5 md:flex-row md:gap-1 mb-12"
  >
    <NewTodoForm
      headingStr="New TODO item"
      class="form-wrapper-layout"
      @submit-new-todo="(todo: TodoModel) => onNewTodoAdded(todo)"
    />

    <div
      v-if="listOfTodos.length > 0"
      class="relative flex justify-center md:max-h-150 w-70 max-w-full overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto scroll-smooth snap-x md:snap-y snap-mandatory rounded-2xl shadow-md bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-700 dark:to-lime-800 p-3 mb-12"
    >
      <div class="flex flex-row md:flex-col gap-3 w-max md:w-full">
        <div
          v-for="todo in listOfTodos"
          class="flex-shrink-0 md:flex-shrink snap-start p-4 rounded-xl shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur-md hover:scale-105 transition-transform duration-300 border-2 border-b-cyan-700 py-2 px-2"
        >
          <TodoItem
            v-bind:todo-item="todo"
            v-if="todo"
            :key="todo.todoId"
            class="bg-transparent transition-transform duration-500 cursor-pointer"
            :class="{
              'animate-fade-in-scale': listOfTodos.includes(todo),
              'animate-fade-out-scale': !listOfTodos.includes(todo),
            }"
            @delete-todo="(id: number) => delAtId(id)"
            @click="syncTodoForPanelAndShowIt(todo.todoId)"
          />
        </div>
      </div>
    </div>
  </main>
  <div class="flex flex-row justify-between items-end pb-2 pt-5 md:pt-12">
    <TodoCounter
      class="bottom-left-counter-layout"
      :totalTodo="todoCounter.totalTodo"
      :done="todoCounter.done"
      :inProgress="todoCounter.inProgress"
    />
    <footer class="app-version"><span class="select-none">version: </span>{{ appVersion }}</footer>
  </div>
</template>

<style scoped>
@import './assets/styles/root.css';
/* For WebKit-based browsers */
/* ::-webkit-scrollbar {
  display: none;
} */

/* For Firefox */
/* html {
  scrollbar-width: none;
} */

/* For legacy Edge/IE */
/* body {
  -ms-overflow-style: none;
} */
</style>
