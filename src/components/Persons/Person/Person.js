import React, { Component } from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';

class Person extends Component {
	render() {
		console.log('[Person.js] rendering...');
		return (
			//Instead of using one single root element, can return array of elements [], separated by a comma and which have a Key
			//Or also an Aux(Wrapping) element just to fulfil the technicality of having a root element
			<Aux>
				<p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
				<p>{this.props.children}</p>
				<input type="text" onChange={this.props.changed} value={this.props.name}/>
			</Aux>
		);
	}

};

//To restrict what prop values must be sent to a component
Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func
};

export default withClass(Person, classes.Person);