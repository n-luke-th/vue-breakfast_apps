enum TodoStatus {
  inProgress,
  done,
}

interface TodoModel {
  name: string | undefined;
  desc?: string | undefined;
  due: Date | undefined;
  status: TodoStatus | undefined;
  todoId: number;
}

interface TodoCounter {
  totalTodo: number;
  done: number;
  inProgress: number;
}

function todoAsMapStr(obj: TodoModel): string {
  return `{
  id: ${obj.todoId.toString()},
  name: ${obj.name},
  due: ${obj.due},
  status: ${todoStatusAsStr(obj.status)}
  }`;
}

function todoStatusAsStr(todo?: TodoStatus): string {
  if (todo === TodoStatus.done) {
    return 'done';
  } else {
    return 'in progress';
  }
}

export { TodoStatus, todoAsMapStr, todoStatusAsStr };
export type { TodoModel, TodoCounter };
