<template>
    <div class="bg-green-200 border-2 border-amber-200 rounded-md">
        <p v-if="totalTodo < 1"></p>
        <div v-else class=" rounded-2xl">
            <p class="text-violet-600">{{ inProgress }} task {{ shouldAddS(inProgress) ? "s are" : " is" }} in progress
            </p>
            <p class=" text-red-500">{{ done }} task{{ shouldAddS(done) ? "s" : "" }} done out of <i
                    class="text-bold text-red-800">{{ totalTodo }} task{{ shouldAddS(totalTodo) ? "s" : "" }}</i>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    totalTodo: number,
    done: number,
    inProgress: number
}>()

function shouldAddS(n: number): boolean {
    return n > 1
}
</script>

<style></style>