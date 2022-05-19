import List from '../List/List'

import './Lists.scss'

const Lists = ({ lists, setLists, showButtonHandler, curListIndex, setCurListIndex }) => {
  return (
    <ul className="lists">
      {
        lists.map(list => (
          <List
            key={list.id}
            list={list}
            lists={lists}
            setLists={setLists}
            showButtonHandler={showButtonHandler}
            curListIndex={curListIndex}
            setCurListIndex={setCurListIndex}
          />
        ))
      }
    </ul>
  )
}

export default Lists