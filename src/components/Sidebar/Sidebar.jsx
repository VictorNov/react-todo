import { useState } from 'react'

import Input from '../Input/Input'
import Lists from '../Lists/Lists'

import './Sidebar.scss'

const Sidebar = ({ lists, setLists, curListIndex, setCurListIndex, sidebarRef, buttonIconRef }) => {
  // В состоянии сайдбара храним значение поля ввода названия нового списка
  const [inputText, setInputText] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    // Если вместо текста введены пробелы - показываем предупреждение
    // Иначе создаем новый объект в начале массива lists
    if (inputText.trim() === '') {
      alert('Введите название списка')
      setInputText('')
    } else if (inputText !== '') {
      setLists([
        {
          name: inputText,
          id: new Date().getTime(),
          todos: [],
        },
        ...lists
      ])
      setInputText('') // Обнуляем поле ввода
      setCurListIndex(0) // Переводим фокус на новый список
    }
  }

  // Обработчик нажатия на кнопку раскрытия сайдбара для мобильной версии
  const showButtonHandler = () => {
    sidebarRef.current.classList.toggle('show-lists')

    buttonIconRef.current.classList.toggle('fa-angle-down')
    buttonIconRef.current.classList.toggle('fa-angle-up')
  }

  return (
    <aside ref={sidebarRef} className="sidebar">
      <div className="sidebar__controls">
        <h2>Ваши списки</h2>
        <button
          className="sidebar__show-button"
          onClick={showButtonHandler}
        >
          <i ref={buttonIconRef} className="fas fa-angle-down button" />
        </button>
      </div>

      <form
        className="sidebar__form"
        onSubmit={submitHandler}
      >
        <Input
          inputText={inputText}
          setInputText={setInputText}
          placeholder="Название списка"
        />
      </form>

      <hr />

      <Lists
        lists={lists}
        setLists={setLists}
        showButtonHandler={showButtonHandler}
        curListIndex={curListIndex}
        setCurListIndex={setCurListIndex}
      />
    </aside>
  )
}

export default Sidebar