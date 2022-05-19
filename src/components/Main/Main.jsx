import { useState, useEffect } from 'react'

import './Main.scss'
import Form from '../Form/Form'
import TodoList from '../TodoList/TodoList'
import TodoListControls from '../TodoListControls/TodoListControls'

const Main = ({ lists, setLists, curListIndex, setCurListIndex, sidebarRef, buttonIconRef }) => {
  // В состоянии основного компонента храним состояние фильтра задач
  // и массив отфильтрованных задач
  const [filter, setFilter] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  // Обновляем массив отфильтрованных задач каждый раз при обновлении:
  // фильтра, индекса текущего списка или списков задач
  useEffect(() => {
    setFilteredTodos(
      lists[curListIndex]?.todos?.filter(item => {
        if (filter === 'completed') {
          return item.completed
        } else if (filter === 'uncompleted') {
          return !item.completed
        }
        return true
      })
    )
  }, [filter, curListIndex, lists])

  // Раскрываем сайдбар в мобильной версии по клику на предложение создать новый список
  const sidebarOpen = () => {
    sidebarRef.current.classList.toggle('show-lists')

    buttonIconRef.current.classList.toggle('fa-angle-down')
    buttonIconRef.current.classList.toggle('fa-angle-up')
  }

  return (
    <main className="main">
      <header className="main__header">
        {
          lists[curListIndex] ?
            <h1>{lists[curListIndex].name}</h1> :
            <p onClick={sidebarOpen}>Создайте свой первый список</p>
        }
      </header>
      {
        lists[curListIndex] &&
          <>
            <Form
              setFilter={setFilter}
              filter={filter}
              lists={lists}
              setLists={setLists}
              curListIndex={curListIndex}
            />
            <hr />
            <TodoList
              filter={filter}
              filteredTodos={filteredTodos}
              curListIndex={curListIndex}
              lists={lists}
              setLists={setLists}
            />
            <TodoListControls
              lists={lists}
              curListIndex={curListIndex}
              setCurListIndex={setCurListIndex}
              disabled={lists?.length <= 1}
            />
          </>
      }
    </main>
  )
}

export default Main