import React, { useEffect } from 'react';
import { Button, Drawer, TextArea } from '@blueprintjs/core'
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import useAppState from './reducer'
import FilterableList from './filterable_list'
import TodoItem from './todo_item'

const App = () => {

    const [state, actions] = useAppState({
        todos: [],
        shown: null
    })

    // useEffect(()=>{
    //     actions.todos.add([
    //         "kupi vodu",
    //         "jedi celer",
    //         "iskopaj zlato",
    //         "osvoji svet",
    //     ])
    // }, [])

    const shownItem = state.todos.find(item => item.id===state.shown)
    const drawer = (
        <Drawer
            isOpen={state.shown!==null}
            isCloseButtonShown={true}
            onClose={()=>{actions.show()}}
            title={shownItem?.label}
        >
            {
                shownItem===undefined
                    ? null
                    : (
                        <div style={{padding: "40px"}}>
                            <TextArea
                                placeholder="To-do item description..."
                                spellCheck={false}
                                value={shownItem.description}
                                growVertically
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    actions.todos.update(shownItem.id, {description: e.target.value})
                                }}
                            />
                        </div>
                    )
            }
        </Drawer>
    )

    return (
        <div style={{width: "400px", margin: "40px auto"}}>
            {drawer}
            <h3>My To-do list:</h3>
            <FilterableList
                items={state.todos}
                renderItem={item => {
                    return (
                        <div style={{display: "grid", alignItems: "center", gridTemplateColumns: "1fr 24px"}}>
                            <TodoItem
                                key={item.id}
                                item={item}
                                onChange={()=>actions.todos.update(item.id, {checked: !item.checked})}
                                onRemove={()=>actions.todos.remove(item.id)}
                                onRename={label => actions.todos.update(item.id, {label})}
                            />
                            <Button minimal small icon="share" onClick={()=>{actions.show(item.id)}}/>
                        </div>
                    )
                }}
                serialize={item => item.label}
            >
                <Button
                    text="Add new item"
                    icon="small-plus"
                    onClick={()=>{actions.todos.add("")}}
                />
            </FilterableList>
        </div>
    );
}

export default App;