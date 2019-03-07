import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilterTypes } from '../actions'
import './App.css'

const Footer = () => (
	<div>
		<br/>
		<br/>
		<span>显示: </span>
		<FilterLink filter={VisibilityFilterTypes.SHOW_ALL}>
			全部
		</FilterLink>
		<FilterLink filter={VisibilityFilterTypes.SHOW_ACTIVE}>
			尚未完成
		</FilterLink>
		<FilterLink filter={VisibilityFilterTypes.SHOW_COMPLETED}>
			已经完成
		</FilterLink>

		<a href="/"> <button style={{marginLeft: '4px'}}> 退出 </button></a>

	</div>
)

export default Footer
