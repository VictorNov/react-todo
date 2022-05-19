import React, {useRef} from 'react'
import './Todo.scss'

const Todo = ({todo, lists, setLists, curListIndex}) => {
  // Ссылка на элемент списка для анимации удаления
  const todoRef = useRef()

  // Обработчик удаления элемента списка
  const deleteHandler = () => {
    // Активируем анимацию
    todoRef.current.classList.add('fall')

    // По завершении анимации удаляем элемент из списка
    setTimeout(() => {
      setLists(
        lists.map((item, index) => {
          if (index === curListIndex) {
            item.todos = item.todos.filter(el => el.id !== todo.id)
          }
          return item
        })
      )
    }, 500
    )
  }

  // Обработчик завершения задачи
  const completeHandler = () => {
    setLists(
      lists.map((item, index) => {
        if (index === curListIndex) {
          item.todos = item.todos.map( el => {
            el.id === todo.id && ( el.completed = !el.completed )
            return el
          } )
        }
        return item
      })
    )
  }

  // Обработчик редактирования текста задачи
  const editHandler = () => {
    // Просим пользователя скорректировать текст задачи
    let newText = prompt('Скорректируйте текст задачи', todo.text)

    // Обновляем текст задачи или сохраняем без изменений, если prompt вернул null
    setLists(
      lists.map((item, index) => {
        if (index === curListIndex) {
          item.todos.forEach(el => {
            el.id === todo.id && (todo.text = newText ? newText : todo.text)
          })
        }
        return item
      })
    )
  }

  return (
    <li className="todo" ref={todoRef}>
      <span className={`${todo?.completed ? 'completed ' : ''}todo__item`}>{todo?.text}</span>
      <button
        className="button todo__complete-btn"
        onClick={completeHandler}
      >
        <i className={`fas${todo?.completed ? ' fa-undo' : ' fa-check'}`} />
      </button>
      <button
        className="button list__button-edit"
        onClick={editHandler}
      >
        <i className="fas fa-pen" />
      </button>
      <button
        className="button todo__trash-btn"
        onClick={deleteHandler}
      >
        <i className="fas fa-trash" />
      </button>
    </li>
  )
}

export default Todo