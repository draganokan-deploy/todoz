import { useState } from 'react'

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

    const wrappedActions = traverseAndWrap("", actions, (path, oldState, args) => {
        console.log(`${path} action:`)
        console.log(JSON.stringify(args, null, 4))
        console.log(JSON.stringify(state, null, 4))
    })
    
    return [state, wrappedActions] as [AppState, typeof wrappedActions]
}

function traverseAndWrap(path: string, obj: Record<any, any>, extra: (path: string, odlState: any, args: any)=>void) {
    for (var Key in obj) {
        if (typeof obj[Key]==="function") {
            obj[Key] = prependFn(`${path}:${Key}`, extra, obj[Key])
        } else {
            obj[Key] = traverseAndWrap(`${path}:${Key}`, obj[Key], extra)
        }
    }
    return obj
}

function prependFn<T extends (...args: any) => any>(path: string, extra: (path: string, odlState: any, args: any) => void, fn: T) {
    return ((...args: Parameters<typeof fn>): ReturnType<T> => {
        extra(path, {}, args)
        return fn(args)
    })
}

// function wrapActions<T extends Record<keyof T, (...args: any)=>any>>(funcList: T) {

//     type WrapMap = {
//         [K in keyof T]: (...args: Parameters<T[K]>)=>void
//     }
//     let map: WrapMap
//     for (var Key in map) {
//         map[Key] = wrapOne(funcList[Key])
//     }
//     return map
// }

export default useAppState