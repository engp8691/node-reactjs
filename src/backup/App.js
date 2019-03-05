import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor () {
		super();
 
		this.state = {
			email: "yonglin@tom.com",
			password: "PassWordOne",
			xauth: ""
		};
 
        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
    }

	onSubmit(e) {
		e.preventDefault();
		const data = JSON.stringify(this.state);

		// fetch("https://sleepy-ocean-58992.herokuapp.com/user/login/", {
		fetch("/user/login/", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: data
		}).then((response) => {
			console.log(response);

			console.log(35, response.headers.entries());

			for (var pair of response.headers.entries()) {
				if(pair[0] === 'x-auth'){
					console.log(pair[0]+ ': '+ pair[1]);
					this.setState({xauth: pair[1]});
				}
			}

			return response.json();
		}).then((responseData, err) => {
			console.log(responseData);
      		// console.log(JSON.stringify(responseData.body));
			this.setState(responseData);
  		});
    }

    onEmailChange(e) {
        const email = e.target.value;
        this.setState({ email });
    }

    onPasswordChange(e) {
        const password = e.target.value;
        this.setState({ password });
    }

	render() {
		return (
			<div className="centered-form__form">
			<form onSubmit={this.onSubmit}>
				<div className="form-field">
					<h3>Please Login</h3>
				</div>
				<div className="form-field">
					<label>Email:</label>
					<input type="text" id="email" name="email" onChange={this.onEmailChange} value={this.state.email} />
				</div>
				<div className="form-field">
					<label>Password</label>
					<input type="password" id="password" name="password" onChange={this.onPasswordChange} value={this.state.password} />
				</div>
				<div className="form-field">
					<button>Login</button>
				</div>
			</form>
			</div>
		);
	}
}

export default App;

