<template>
  <div class="new-todo-form">
    <h1 class="font-black text-3xl drop-shadow-xs drop-shadow-blue-300">
      {{ headingStr == undefined ? 'New' : headingStr }}
    </h1>
    <form @submit.prevent="onSubmit" @reset="resetItems" id="new" ref="new-todo">
      <div class="name-block">
        <label for="new-todo-name">New TODO name: </label>
        <input
          id="new-todo-name"
          form="new"
          type="text"
          class="my-2 py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-opacity-50 focus:outline-none dark:text-amber-400"
          v-model.trim="newTodoItem.name"
          placeholder="enter todo name..."
          pattern=".{1,}"
          minlength="1"
          required
          title="new"
        />
      </div>
      <div class="due-block">
        <label for="new-todo-due">Due date: </label>
        <input
          type="datetime-local"
          class="custom-date-picker"
          v-model="newTodoItem.due"
          form="new"
          id="new-todo-due"
          placeholder="Enter due date here"
          required
        />
      </div>
      <div class="desc-block">
        <label for="new-todo-desc" class="block">Descriptions:</label>
        <textarea
          form="new"
          id="new-todo-desc"
          cols="30"
          rows="7"
          placeholder="enter your todo descriptions here..."
          class="resize-none focus:outline-none dark:text-amber-400"
          v-model.trim="newTodoItem.desc"
        ></textarea>
      </div>
      <div class="form-operation-btns-block">
        <button type="reset" value="clear" class="reset-form-btn" form="new">clear</button>
        <button type="submit" class="submit-form-btn">submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { todoAsMapStr, TodoStatus, type TodoModel } from '@/models/todoModels';
import { inject, reactive, ref, useTemplateRef, type Ref } from 'vue';

const emits = defineEmits<{
  submitNewTodo: [TodoModel];
}>();
const props = defineProps<{
  headingStr?: string;
}>();

const formInput = useTemplateRef('new-todo');

const todoId = inject<Ref<number, number>>('todoId');
const newTodoItem = reactive<TodoModel>({
  name: undefined,
  due: undefined,
  desc: undefined,
  status: TodoStatus.inProgress,
  todoId: -1,
});

function getNextTodoId(): number {
  if (todoId != undefined) {
    todoId.value += 1;
    return todoId.value;
  } else {
    return -1;
  }
}

function onSubmit() {
  newTodoItem.todoId = getNextTodoId();

  console.info(`todo: ${todoAsMapStr(newTodoItem)}`);
  emits('submitNewTodo', { ...newTodoItem }); // Shallow Copy (Object Spread) to prevent passing object reference before emit.
  resetItems();
}

function resetItems() {
  formInput.value?.reset();
  newTodoItem.desc = undefined;
  newTodoItem.due = undefined;
  newTodoItem.name = undefined;
  newTodoItem.status = TodoStatus.inProgress;
  newTodoItem.todoId = -1;
}
</script>

<style scoped>
@import '@/assets/styles/newTodoForm.css';
</style>
