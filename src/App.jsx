import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import ApiSample from './ApiSample'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  // todos が変わるたびに localStorage に保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed:false}
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearAll = () => {
    if (window.confirm('本当に全削除しますか？')) {
      setTodos([])
    }
  }

   const checkTodo = (id) => {
    setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, completed : !todo.completed } : todo
  ))
  }

  return (
    <div>
      <h1>TODOアプリ</h1>
      <TodoForm onAdd={addTodo} />
      <button onClick={clearAll} style={{ margin: '8px 0' }}>
        全削除
      </button>
      <TodoList todos={todos} onDelete={deleteTodo} onCheck={checkTodo} />
    </div>
  )
}

export default App