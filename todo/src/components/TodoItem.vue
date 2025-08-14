<template>
  <div>
    name:
    {{ todoItem?.name }}
    <br />status:
    {{ todoItem?.status }}
    <br />
    due on {{ todoItem?.due }}
  </div>
</template>

<script lang="ts" setup>
import type { TodoModel } from '@/models/todoModels';
import { defineProps } from 'vue';
const props = defineProps<{
  todoItem: TodoModel | undefined;
}>();
</script>

<style scoped></style>
