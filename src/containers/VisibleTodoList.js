import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { VisibilityFilterTypes } from '../actions'

const Todo = ({ onClick, completed, text }) => (
	<li
		onClick={onClick}
		style={{
			textDecoration: completed ? 'line-through' : 'none'
		}}
	>
		{text}
	</li>
)

const VisibleTodoList = ({todo_elems, toggleTodo}) => {
	return (
	<ul>
		{todo_elems.map(todo =>
			<Todo
				key={todo.id}
				{...todo}
				onClick={() => toggleTodo(todo.id)}
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
	toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisibleTodoList)

