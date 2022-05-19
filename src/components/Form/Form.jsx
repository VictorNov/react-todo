import { useState } from 'react'

import './Form.scss'
import Input from '../Input/Input'

const Form = ({ filter, setFilter, lists, setLists, curListIndex }) => {
  // Храним содержимое поля ввода текста задачи в состоянии компонента
  const [inputText, setInputText] = useState('')

  // Создаем новую задачу в начале текущего списка задач
  const submitTodoHandler = (e) => {
    e.preventDefault()

    // Если пользователь ввел только пробелы - выводим предупреждение
    if (inputText.trim() === '') {
      alert('Введите название задачи')
      setInputText('')
    } else if (inputText !== '') {
      setLists(
        lists.map((item, index) => {
          if ( index === curListIndex ) {
            item.todos = [
              {
                text: inputText,
                completed: false,
                id: new Date().getTime(),
              },
              ...lists[ curListIndex ].todos
            ]
          }
          return item
        }))

      setInputText('') // Обнуляем поле ввода
    }
  }

  // Изменяем состояние фильтра
  const filterHandler = (e) => {
    setFilter(e.target.value)
  }

  return (
    <form className="form" onSubmit={submitTodoHandler}>
      <Input
        inputText={inputText}
        setInputText={setInputText}
        placeholder="Текст задачи"
      />
      <label className="form__select">
        <select
          name="todos"
          onChange={filterHandler}
          value={filter}
        >
          <option value="all">Все</option>
          <option value="completed">Завершенные</option>
          <option value="uncompleted">Незавершенные</option>
        </select>
        <span
          className="form__select-button button"
        >
          <i className="fas fa-angle-down" />
        </span>
      </label>
    </form>
  )
}

export default Form