<template>
  <div class="rounded-md border-2 border-b-cyan-700 py-2 px-2">
    name:
    {{ todoItem?.name }}
    <br />status:
    {{ getStatusStr(todoItem?.status) }}
    <br />
    due on {{ todoItem?.due }}
  </div>
</template>

<script lang="ts" setup>
import { TodoStatus, type TodoModel } from '@/models/todoModels';
import { defineProps } from 'vue';
const props = defineProps<{
  todoItem: TodoModel | undefined;
}>();

function getStatusStr(todo?: TodoStatus): string {
  if (todo === TodoStatus.done) {
    return 'done';
  } else {
    return 'in progress';
  }
}
</script>

<style scoped>
@import '../assets/tw.css';
</style>
