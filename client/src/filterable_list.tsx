import React, { useState, CSSProperties } from 'react';
import { InputGroup } from '@blueprintjs/core'

type FilterableListProps<T> = {
  style?: CSSProperties
  children?: React.ReactNode
  items: T[]
  serialize: (item: T) => string
  renderItem: (item: T) => React.ReactNode
}

function FilterableList<T extends {id: number}>(props: FilterableListProps<T>) {

  const [filterQuery, setFilterQuery] = useState<string>("")

  const filteredItems = props.items.filter(item => props.serialize(item).includes(filterQuery))

  return (
      <div style={{...(props.style||{})}}>
          <div style={{marginBottom: "10px"}}>
              <InputGroup
                  value={filterQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterQuery(e.target.value)
                  }}
                  placeholder="Filter..."
                  spellCheck={false}
              />
          </div>
          <div style={{
              marginBottom: "20px"
          }}>
              {
                  filteredItems.map(item => <div key={item.id}>{props.renderItem(item)}</div>)
              }
          </div>
          {props.children}
      </div>
  )
}

export default FilterableList