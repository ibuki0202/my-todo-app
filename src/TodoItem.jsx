function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '8px' }}>
        削除
      </button>
    </li>
  )
}

export default TodoItem