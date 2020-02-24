import React, {useState} from 'react'

type TodoId = number

export type TodoItem = {
  id: TodoId
  label: string
  description: string
  checked: boolean
}

type AppState = {
  todos: TodoItem[]
  shown: TodoId | null
}

function useAppState(initialState: AppState) {
  const [state, setState] = useState<AppState>(initialState)

  const actions = {
    todos: {
      add: (label: string | string[]) => {
        if (typeof label === "string") {
          label = [label]
        }

        const newTodos: TodoItem[] = label.map(lbl => ({
          id: Math.floor(Math.random()*100000),
          label: lbl,
          description: "",
          checked: false
        }))
        setState({
          ...state,
          todos: [...state.todos, ...newTodos]
        })
        return newTodos
      },
      update: (id: TodoId, update: Partial<Omit<TodoItem, "id">>) => {
        const todoIdx = state.todos.findIndex(todo => todo.id === id)
        if (todoIdx!==-1) {
          state.todos[todoIdx] = {
            ...state.todos[todoIdx],
            ...update
          }
          setState({ ...state })
        }
      },
      remove: (id: TodoId) => {
        const idx = state.todos.findIndex(todo => todo.id === id)
        if (idx!==undefined) {
          state.todos.splice(idx, 1)
          setState({ ...state })
        }
      }
    },
    show: (id?: TodoId) => {
      if (id===undefined) {
        setState({...state, shown: null})
      } else {
        setState({...state, shown: id})
      }
    }
  }

  return [state, actions] as [AppState, typeof actions]
}

export default useAppState