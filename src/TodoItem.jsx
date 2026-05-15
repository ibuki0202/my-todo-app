function TodoItem({ todo, onDelete, onCheck }) {
  const style = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  }

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => onCheck(todo.id)}></input>
      <span style={style}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '8px' }}>
        削除
      </button>
    </li>
  )
}

export default TodoItem