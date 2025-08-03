<template>
    <div>
        <h1>{{ typeof (headingStr) == undefined ? "New" : headingStr }}</h1>
        <form @submit.prevent="onSubmit" id="new" ref="new-todo">
            <input type="datetime-local" class="shadow-lg" v-model="newTodoItem.due" form="new">
            <br>
            <input form="new" type="text" class="shadow-lg" v-model.trim="newTodoItem.name"
                placeholder="new TODO name..." pattern=".{1,}" minlength="1" required title="new">

            <br>
            <textarea form="new" name="" id="desc" cols="20" rows="4" placeholder="descriptions"></textarea>
            <br>
            <input type="reset" value="clear"> &star;
            <button type="submit"
                class="bg-amber shadow-orange-50 shadow-2xl border-2 border-amber-500 rounded-xl px-3">submit</button>
        </form>

    </div>
</template>

<script lang="ts" setup>
import { TodoStatus, type TodoModel } from '@/models/todoModels';
import { reactive, ref, useTemplateRef } from 'vue';

const emits = defineEmits<{
    'submitNewTodo': [TodoModel]
}>();
const props = defineProps<{
    headingStr?: string
}>();

const formInput = useTemplateRef('new-todo');

const newTodoItem = reactive<TodoModel>(
    {
        name: undefined,
        due: undefined,
        desc: undefined,
        status: TodoStatus.inProgress
    }
);

function toMapStr(obj: TodoModel): string {
    return `{name: ${obj.name}, due: ${obj.due}, status: ${obj.status?.toString()}}`;
}

function onSubmit() {
    console.info(`todo: ${toMapStr(newTodoItem)}`);
    emits('submitNewTodo', newTodoItem);
    console.info("submitted and emitted");
    formInput.value?.reset();
}
</script>

<style></style>