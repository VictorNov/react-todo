import { useRef } from 'react'

import './List.scss'

const List = ({ list, lists, setLists, showButtonHandler, curListIndex, setCurListIndex }) => {
  // Ссылка на li для добавления анимации при удалении списка
  const listRef = useRef()

  // Редактирование названия списка
  const editHandler = (e) => {
    e.stopPropagation()

    // Просим пользователя отредактировать текущее название
    let newName = prompt('Новое название списка', list.name)

    // Меняем название на новое или сохраняем старое, если метод prompt вернул null
    setLists(
      lists.map(item => {
        if (item.id === list.id) {
          return {...item, name: newName ? newName : list.name}
        }
        return item
      })
    )
  }

  // Удаляем элемент из списка
  const deleteHandler = (e) => {
    e.stopPropagation()

    // Индекс удаляемого элемента нужен что-бы сохранить фокус на конкретном списке
    // или перевести фокус на более новый список, если мы удалили текущий список
    const delListIndex = lists.findIndex(item => item.id === list.id)

    // Анимация падения элемента
    listRef.current.classList.add('fall')

    // Ждем, когда анимация закончится и удаляем элемент из состояния приложения
    setTimeout(() => {
        setLists(
          lists.filter(item => item.id !== list.id)
        )

      // Сравниваем индексы текущего элемента и удаляемого элемента
      // Вносим соответствующие корректировки в индекс текущего элемента
        if ( curListIndex >= delListIndex ) {
          setCurListIndex(curListIndex === 0 ? 0 : curListIndex - 1)
        }
      }, 500
    )
  }

  // При клике на список в сайдбаре переводим фокус на соответствующий список
  const listClickHandler = () => {
    setCurListIndex(lists.findIndex(item => item.id === list.id))

    showButtonHandler() // для мобильной версии так же нужно свернуть сайдбар
  }

  return (
    <li
      ref={listRef}
      className={`list${lists[curListIndex]?.id === list?.id ? ' list--current' : ''}`}
      onClick={listClickHandler}
    >

      <span className="list__name">
        {list.name}
      </span>

      <button
        className="button list__button-edit"
        onClick={editHandler}
      >
        <i className="fas fa-pen" />
      </button>

      <button
        className="button list__button-delete"
        onClick={deleteHandler}
      >
        <i className="fas fa-trash" />
      </button>
    </li>
  )
}

export default List