import TodoItem from './TodoItem'

function TodoList({ todos, onDelete, onCheck }) {
  if (todos.length === 0) {
    return <p>やることはありません</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onCheck={onCheck} />
      ))}
    </ul>
  )
}

export default TodoList