export function addTodo(todos, text) {
  if (text.trim() === '') return todos
  const newTodo = { id: Date.now(), text, completed: false }
  return [...todos, newTodo]
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}

export function countCompleted(todos) {
  return todos.filter((todo) => todo.completed).length
}

