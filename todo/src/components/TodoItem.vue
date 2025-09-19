<template>
  <div class="flex flex-row items-start">
    <div class="flex flex-col">
      {{ todoItem?.todoId }}: {{ todoItem?.name }}
      <br />
      {{ todoStatusAsStr(todoItem?.status) }}
      <br />
      due on {{ todoItem?.due }}
    </div>
    <button
      type="button"
      id="deleteBtn"
      class="hover:scale-150 transition-transform duration-200 cursor-grab"
      @click.stop="() => onDelete(todoItem!.todoId)"
    >
      <svg
        id="deleteSvg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="lightgrey"
        stroke="black"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { todoStatusAsStr, type TodoModel } from '@/models/todoModels';
import { defineProps } from 'vue';

const props = defineProps<{
  todoItem: TodoModel | undefined;
}>();

// const emits = defineEmits<{
//   deleteTodo: [number];
// }>();
const emits = defineEmits<{
  (e: 'deleteTodo', id: number): void;
}>();

function onDelete(id: number) {
  console.log(`del at id '${id}'`);
  emits('deleteTodo', id);
}
</script>

<style scoped>
@import '../assets/tw.css';
</style>
