import { useState, useEffect, useRef } from 'react'

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

function App() {
  // Храним в состоянии списки задач пользовтеля и последний выбранный лист,
  // при инициализации парсим из локального хранилища
  const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) || [])
  const [curListIndex, setCurListIndex] = useState(JSON.parse(localStorage.getItem('curListIndex')) || 0)

  // Так же в главном объекте храним ссылки на узел sidebar и кнопку раскрытия сайдбара для мобильной версии
  // так как нам необходимо обращаться к этим узлам как из сайдбара так и из списков
  const sidebarRef = useRef()
  const buttonIconRef = useRef()

  // При изменении списков задач или индекса выбранного списка сохраняем в локальном хранилище
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
    localStorage.setItem('curListIndex', JSON.stringify(curListIndex))
  }, [lists, curListIndex])

  return (
    <div className="app">
      <Sidebar
        lists={lists}
        setLists={setLists}
        curListIndex={curListIndex}
        setCurListIndex={setCurListIndex}
        sidebarRef={sidebarRef}
        buttonIconRef={buttonIconRef}
      />
      <Main
        curListIndex={curListIndex}
        setCurListIndex={setCurListIndex}
        lists={lists}
        setLists={setLists}
        sidebarRef={sidebarRef}
        buttonIconRef={buttonIconRef}
      />
    </div>
  );
}

export default App;
