import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td><Button todoID={props.todo._id}/></td>
    </tr>
);

const Button = props => {
    function myFunction() {
        axios.post('http://localhost:4000/todos/delete/'+props.todoID)
            .then(res => console.log(res.data));
        
        //props.history.push('/');
    }
    return <button onClick={myFunction}>Delete</button>
}

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        // const obj = {
        //     todo_description: "hello",
        //     todo_responsible: "response.data.todo_responsible",
        //     todo_priority: "response.data.todo_priority",
        //     todo_completed: ""
        //  };
        
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}