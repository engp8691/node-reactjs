import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const mapStateToProps = function(state, ownProps) {
	return {...state, ...ownProps}
}

const AddTodo = (props) => {
	// let dispatch = props.dispatch;
	// This is the fancy way
	let { dispatch } = props;

	let textInput;

	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault();

				if (!textInput.value.trim()) {
					return
				}
				dispatch(addTodo(textInput.value));
				textInput.value = ''
			}}>

			<input type="text" ref={(txt)=>{textInput=txt;}} />
			<button type="submit">
				添加今日事项
			</button>
			</form>
		</div>
	)
}

// AddTodo is a container component, connect it to the Redux store.
export default connect(mapStateToProps)(AddTodo)

