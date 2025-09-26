<template>
  <div
    id="todo-item-details-panel"
    class="flex flex-col justify-around mx-2 my-2 rounded-2xl bg-amber-200 dark:bg-amber-900"
  >
    <div>
      <h1 class="pb-2 font-black flex flex-row text-4xl justify-center">
        {{ panelTitle ?? 'Closing' }}
      </h1>
      <h4 class="text-center">{{ panelSubTitle ?? '' }}</h4>
    </div>

    <slot name="content1"></slot>

    <slot name="content2"></slot>

    <div class="flex flex-row justify-around justify-items-center mx-2 mt-3 mb-1">
      <button type="button" :class="getBtn1Class()" @click="onBtn1Click()">CLOSE</button>
      <button
        type="button"
        v-if="onBtn2Click"
        :class="{
          'rounded-2xl bg-amber-500': onBtn2Click,
        }"
        @click="onBtn2Click()"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  panelTitle?: string;
  panelSubTitle?: string;
  btn1Class?: string;
  btn2Class?: string;
  onBtn1Click: VoidFunction;
  onBtn2Click?: VoidFunction;
}>();

function getBtn1Class(): string {
  return props.btn1Class == undefined
    ? 'rounded-md py-2 px-3 cursor-pointer bg-red-500 dark:bg-amber-800 hover:animate-pulse'
    : props.btn1Class;
}

function getBtn2Class(): string {
  return props.btn2Class == undefined
    ? 'rounded-md py-2 px-5 cursor-pointer hover:animate-pulse'
    : props.btn2Class;
}
</script>

<style scoped>
@import '@/assets/tw.css';
</style>
