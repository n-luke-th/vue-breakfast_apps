<template>
  <div
    class="border-2 border-green-400 bg-green-200 rounded-md text-amber-950 dark:border-amber-900 dark:text-amber-400 dark:bg-amber-950"
  >
    <p v-if="totalTodo < 1">No Todo items yet.</p>
    <div v-else class="rounded-2xl">
      <p class="text-violet-600">
        {{ inProgress }} task{{ shouldAddS(inProgress) ? 's are' : ' is' }} in progress
      </p>
      <p class="text-red-500 dark:text-green-500">
        {{ done }} task{{ shouldAddS(done) ? 's' : '' }} done out of
        <i class="text-bold text-red-800 dark:text-amber-400"
          >{{ totalTodo }} task{{ shouldAddS(totalTodo) ? 's' : '' }}</i
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  totalTodo: number;
  done: number;
  inProgress: number;
}>();

function shouldAddS(n: number): boolean {
  return n > 1;
}
</script>

<style></style>
