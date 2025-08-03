enum TodoStatus {
  inProgress,
  done,
}

interface TodoModel {
  name: string | undefined
  desc?: string | undefined
  due: Date | undefined
  status: TodoStatus | undefined
}

interface TodoCounter {
  totalTodo: number
  done: number
  inProgress: number
}

export { TodoStatus }
export type { TodoModel, TodoCounter }
