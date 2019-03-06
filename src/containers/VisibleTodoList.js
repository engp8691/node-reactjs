import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { VisibilityFilterTypes } from '../actions'


const Todo = ({ onClick, _id, text, completed, completedAt, _creator }) => (
	<li
		data-todo-_id = {_id}
		data-todo-completed = {completed}
		data-todo-completedAt = {completedAt}
		data-todo-_creator = {_creator}
		onClick = {onClick}
		style = {{
			textDecoration: completed ? 'line-through' : 'none'
		}}
	>
		{text}
	</li>
)

const VisibleTodoList = ({todo_elems, toggleTodo}) => {
	return (
	<ul>
		{todo_elems.map(todo =><Todo
				key={todo._id}
				{...todo}
				onClick={() => toggleTodo(todo._id, todo.completed)}
			/>
		)}
	</ul>
	);
}

// Auxiliary function
const getVisibleTodos = (todo_elems, filter) => {
	switch (filter) {
		case VisibilityFilterTypes.SHOW_ALL:
			return todo_elems
		case VisibilityFilterTypes.SHOW_COMPLETED:
			return todo_elems.filter(t => t.completed)
		case VisibilityFilterTypes.SHOW_ACTIVE:
			return todo_elems.filter(t => !t.completed)
		default:
			throw new Error('Unknown filter: ' + filter)
	}
}

const mapStateToProps = (state) => {
	// console.log(44, state);

	// The state has todos and visibilityFiler fields because
	// reducers = combineReducers({todos, visibilityFilter});
	return ({
		todo_elems: getVisibleTodos(state.todos, state.visibilityFilter)
	});
}

const mapDispatchToProps = dispatch => ({
	toggleTodo: (_id, completed) => {
		const token = sessionStorage.getItem('x-auth');

		const data = JSON.stringify({_id: _id, completed: !completed});

		var myInit = {
			method: 'PATCH',
			headers:{
				'Content-Type': 'application/json',
				'x-auth': token
			},
			body: data,
			mode: 'cors',
			cache: 'default'
		};

		fetch(`/todo/${_id}`, myInit).then(res => {
			return res.json();
		}).then((responseData, err) => {
			console.log(80, responseData, err);
		});

		return dispatch(toggleTodo(_id, completed));
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisibleTodoList)

