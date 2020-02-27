import React from 'react'
import { Button, Drawer, TextArea } from '@blueprintjs/core'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import useAppState from './reducer'
import FilterableList from './filterable_list'
import TodoItem from './todo_item'
import Profile1 from './profile1'
import Profile2 from './profile2'
import Profile3, {Title, Month} from './profile3'
import Shapes from './homework/shapes'
import PostalOffice from './homework/postaloffice'

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
        <>
            {/* TODOS */}
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

            {/* PROFILE 1 - pure JS version */}
            <Profile1
                name="Dragan Okanovic"
                dob="6/11/1993"
                sex="M"
                relationship_status="single"
                posts={[]}
            />

            {/* PROFILE 2 - JS + propTypes */}
            <Profile2
                name="Dragan Okanovic"
                dob="6/11/1993"
                sex="M"
                relationship_status="single"
                posts={[]}
            />

            {/* PROFILE 3 - Typescript version */}
            <Profile3
                name={{
                    first: "Dragan",
                    last: "Okanovic",
                    title: Title.Mr
                }}
                dob={{
                    day: 11,
                    month: Month.JUN,
                    year: 1993
                }}
                sex="male"
                relationship_status="single"
                posts={[{
                    content: "Hello world!",
                    date: {
                        day: 25,
                        month: Month.FEB,
                        year: 2020
                    },
                    visibility: "public"
                }]}
            />

            <Shapes count={100} />
        </>
    );
}

export default App;