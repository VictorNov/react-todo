import './TodoListControls.scss'

const TodoListControls = ({ lists, curListIndex, setCurListIndex, disabled }) => {
  // Переключение между несколькими списками задач
  const clickHandler = (direction) => {
    if (direction === 'prev') {
      setCurListIndex(curListIndex === lists.length - 1 ? 0 : curListIndex + 1)
    } else {
      setCurListIndex(curListIndex === 0 ? lists.length - 1 : curListIndex - 1)
    }
  }

  return (
    <nav className="todo-list-controls">
      <button
        className="todo-list-controls__button"
        onClick={clickHandler.bind(null, 'prev')}
        disabled={disabled}
      >
        <i className="fas fa-arrow-left" />
        <span>Предыдущий список</span>
      </button>
      <button
        className="todo-list-controls__button"
        onClick={clickHandler.bind(null, 'next')}
        disabled={disabled}
      >
        <span>Следующий список</span>
        <i className="fas fa-arrow-right" />
      </button>
    </nav>
  )
}

export default TodoListControls