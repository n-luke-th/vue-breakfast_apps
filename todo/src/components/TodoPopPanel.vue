<template>
  <div
    id="todo-item-details-panel"
    class="mx-2 my-2 rounded-2xl bg-amber-200 dark:bg-amber-900 animate-fade-in-scales"
  >
    <h1 class="font-black flex flex-row justify-self-center text-3xl">
      {{ panelTitle ?? 'Attention' }}
    </h1>
    <p class="mt-3 mx-5">{{ panelDesc ?? '' }}</p>
    <div
      class="flex flex-row justify-self-center justify-around justify-items-center align-bottom mx-2 mt-3 mb-1"
    >
      <button type="button" :class="getBtn1Class()" @click="onBtn1Click()">CLOSE</button>
      <button type="button" v-if="onBtn2Click"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  panelTitle?: string;
  panelDesc?: string;
  btn1Class?: string;
  onBtn1Click: VoidFunction;
  onBtn2Click?: VoidFunction;
}>();

function getBtn1Class(): string {
  return props.btn1Class == undefined
    ? 'rounded-md py-2 px-1 cursor-pointer bg-red-500 dark:bg-amber-800 hover:animate-pulse'
    : props.btn1Class;
}
</script>

<style scoped>
@import '@/assets/tw.css';
</style>
