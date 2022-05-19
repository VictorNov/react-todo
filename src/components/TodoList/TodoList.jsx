import Todo from '../Todo/Todo'
import './TodoList.scss'

const TodoList = ({filter, filteredTodos, curListIndex, lists, setLists}) => {
  return (
    <ul className="todo-list">
      {
        filteredTodos?.length > 0 ?
          // Если массив не пустой - выводим список задач
          filteredTodos?.map(todo => (
            <Todo
              key={todo?.id}
              todo={todo}
              curListIndex={curListIndex}
              lists={lists}
              setLists={setLists}
            />
          )) :
          // Если массив пустой - выводим сообщение, согласованное с текущим состоянием фильтра
          <p className="todo-list__message">{
            (filter === 'all' && 'Создайте первую задачу') ||
            (filter === 'completed' && 'Нет выполненных задач') ||
            (filter === 'uncompleted' && 'Нет невыполненных задач')
          }</p>
      }
    </ul>
  )
}

export default TodoList