import './Input.scss'

// Универсальный компонент поля ввода.
// Принимает состояние inputText от родителя и производит над ним манипуляции
// Событие Submit обрабатывает родитель!
// Опционально принимает текст для placeholder
const Input = ({ inputText, setInputText, placeholder }) => {
  const inputHandler = (e) => {
    setInputText(e.target.value)
  }

  return (
    <label className="input">
      <input
        type="text"
        className="input__field"
        onChange={inputHandler}
        value={inputText}
        required
        placeholder={placeholder ? placeholder : 'Введите текст'}
      />
      <button
        className="button input__button"
        type="submit"
      >
        <i className="fas fa-plus" />
      </button>
    </label>
  )
}

export default Input