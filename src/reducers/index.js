import { VisibilityFilterTypes } from '../actions'
import { combineReducers } from 'redux'

const todos = (state = [], action) => {
	// console.log(5, "todos: ", action);

	switch (action.type) {
		case 'ADD_TODO':
			if(action.text){
				if(String(action.text).trim().length<1){
					return state;
				}
			}else{
				return state;
			}

			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case 'TOGGLE_TODO':
			return state.map(todo =>
				(todo.id === action.id) ? {...todo, completed: !todo.completed} : todo
			)
		default:
			return state
	}
}

const visibilityFilter = (state = VisibilityFilterTypes.SHOW_ALL, action) => {
	// console.log(27, "visibilityFilter: ", action);

	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter
		default:
			return state
	}
}

const reducers = combineReducers({todos, visibilityFilter});

export default reducers;

