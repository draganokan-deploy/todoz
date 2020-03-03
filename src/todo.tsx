import React from 'react'
import {Checkbox, EditableText, InputGroup} from '@blueprintjs/core'

export type Todo = {
    checked: boolean
    name: string
}

class TodoItem extends React.Component<Todo> {
    render() {
        return (
            <div style={{display: "flex", alignItems: "center"}}>
                <Checkbox checked={this.props.checked} /* onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ this.setState({checked: !this.state.checked}) }} *//>
                <EditableText value={this.props.name} /* onChange={val => this.setState({name: val})} *//>
            </div>
        )
    }
}

export default TodoItem

type RenderOneFn<T> = (item: T) => JSX.Element

type FListProps<T> = {
    data: T[]
    renderOne: RenderOneFn<T>
    serialize: (item: T) => string
}

function dsa(): string {
    return ""
}

type FListState = {
    filter: string
}

class FilterableList<T> extends React.Component<FListProps<T>, FListState> {
    state = {
        filter: ""
    }
    render() {
        return (
            <div>
                <InputGroup
                    value={this.state.filter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.setState({filter: e.target.value})}}
                />
                {
                    this.props.data
                        .filter(item => this.props.serialize(item).includes(this.state.filter))
                        .map((item,id) => <div key={id}>{this.props.renderOne(item)}</div>)
                }
            </div>
        )
    }
}

export {
    FilterableList
}