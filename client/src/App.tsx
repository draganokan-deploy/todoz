import React, { useState } from 'react';

type TodoItemType = {
    id: number
    title: string
}

type TodoState = {
    items: string
    checked: { [id: number]: string }
}

const Todo = () => {
    const [state, setState] = useState()
}

const TodoItem = (prop) => {

    return (
        <div>todo item</div>
    )
}

const App = () => {
    return (
        <div className="App">
            hello todoz
        </div>
    );
}

export default App;
