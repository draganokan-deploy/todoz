import React from 'react';
import {Checkbox, Button, EditableText} from '@blueprintjs/core'
import {TodoItem as TodoItemType} from './reducer'

type TodoItemProps = {
  item: TodoItemType
  onChange: () => void
  onRemove: () => void
  onRename: (label: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ item: {label, checked}, onChange, onRemove, onRename }) => {

  return (
      <div style={{display: "grid", alignItems: "center", gridTemplateColumns: "24px 1fr 24px"}}>
          <Checkbox
              checked={checked}
              onChange={onChange}
              style={{margin: 0}}
          />
          <EditableText
              value={label}
              onChange={val=>onRename(val)}
              placeholder="Label..."
              alwaysRenderInput={true}
          />
          <Button icon="small-cross" onClick={onRemove} minimal small/>
      </div>
  )
}

export default TodoItem