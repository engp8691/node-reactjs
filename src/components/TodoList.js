import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {addTodo} from '../actions';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import './App.css';

class TodoList extends React.Component {
	addATodo(sth){
		this.props.toAddTodo(sth);
	}

	componentDidMount() {
		const token = sessionStorage.getItem('x-auth');
		console.log(19, token);

		var myInit = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
				'x-auth': token
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch('/todos', myInit).then(res => {
			return res.json();
		}).then((responseData, err) => {
			if(responseData.todos && responseData.todos.length>0){
				console.log(33, responseData.todos.length, responseData.todos);
				responseData.todos.forEach(aThing=>{
					console.log(35, aThing.text);
					this.props.toAddTodo(aThing.text);
				});
			}
		});

		axios.get(`./todos.json`).then(res => {
			console.log(13, res.data);
			// let todos = JSON.parse(res.data);
			let todos = res.data.todos;

			if(todos.length>0){
				todos.map((elem)=>{
					let desc = elem.desc;
					this.props.toAddTodo(desc);

					return desc;
				});
			}else{
				this.props.toAddTodo("起床");
				this.props.toAddTodo("洗漱");
			}
		}).catch(function (error) {
			console.log(error);
		});
	}
	
	render(){
		return (
			<div>
				<AddTodo />
				<VisibleTodoList />
				<Footer />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
    return {
        toAddTodo: (sth) => dispatch(addTodo(sth)),
    }
}

export default connect(null, mapDispatchToProps)(TodoList);

