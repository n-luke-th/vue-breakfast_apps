<template>
  <div class="new-todo-form">
    <h1 class="font-black text-3xl">
      {{ headingStr == undefined ? 'New' : headingStr }}
    </h1>
    <form @submit.prevent="onSubmit" id="new" ref="new-todo">
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

      <label for="new-todo-due">Due date: </label>
      <input
        type="datetime-local"
        class="dark:text-amber-400 shadow-md"
        v-model="newTodoItem.due"
        form="new"
        id="new-todo-due"
        required
      />
      <div class="desc-block">
        <label for="new-todo-desc" class="block">Descriptions:</label>
        <textarea
          form="new"
          id="new-todo-desc"
          cols="20"
          rows="8"
          placeholder="enter your todo descriptions here..."
          class="resize-none focus:outline-none dark:text-amber-400"
        ></textarea>
      </div>
      <div class="form-operation-btns-block">
        <button type="reset" value="clear" class="reset-form-btn">clear</button> &nbsp;
        <button type="submit" class="submit-form-btn">submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { TodoStatus, type TodoModel } from '@/models/todoModels';
import { reactive, ref, useTemplateRef } from 'vue';

const emits = defineEmits<{
  submitNewTodo: [TodoModel];
}>();
const props = defineProps<{
  headingStr?: string;
}>();

const formInput = useTemplateRef('new-todo');

const newTodoItem = reactive<TodoModel>({
  name: undefined,
  due: undefined,
  desc: undefined,
  status: TodoStatus.inProgress,
});

function toMapStr(obj: TodoModel): string {
  return `{name: ${obj.name}, due: ${obj.due}, status: ${obj.status?.toString()}}`;
}

function onSubmit() {
  console.info(`todo: ${toMapStr(newTodoItem)}`);
  emits('submitNewTodo', newTodoItem);
  resetItems();
}

function resetItems() {
  formInput.value?.reset();
}
</script>

<style scoped>
@import '@/assets/styles/newTodoForm.css';
</style>
