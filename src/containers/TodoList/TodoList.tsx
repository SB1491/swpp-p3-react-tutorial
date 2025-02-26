import React, { useState, useMemo } from "react";
import Todo from '../../components/Todo/Todo'
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css"
import {Link, NavLink} from "react-router-dom"
import NewTodo from "./NewTodo/NewTodo";

interface IProps {
    title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean;};


export default function TodoList(props: IProps ){
    const {title} = props;
    const [todos, setTodos] = useState<TodoType[]>([
        {id: 1, title: "SWPP", content: "take swpp class", done: true},
        {id: 2, title: "VTuber", content: "watch Suisei archive", done: false},
    ])
    const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
    const clickTodoHandler = (td: TodoType) => {
        if (selectedTodo === td){
            setSelectedTodo(null);
        } else{
            setSelectedTodo(td);
        }
    }
    const todoDetail = useMemo(() => {
        return selectedTodo ? (
            <TodoDetail title={selectedTodo.title} content={selectedTodo.content} />
        ) : null;
    }, [selectedTodo]);

    
    return (
        <div className="TodoList">
            <div className="title">{title}</div>
            <div className="todos">
            {todos.map((td) => {
                return <Todo key={td.id} title={td.title} done={td.done} clicked={() => clickTodoHandler(td)} />;
            })}
            {todoDetail}
            <NewTodo />
            <NavLink to="/new-todo" >New Todo</NavLink>
            </div>
        </div>
    );
}