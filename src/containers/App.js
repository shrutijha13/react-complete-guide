import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component{

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');

  }

  state  = {
   persons: [
   {id: 'adsh', name: 'Shruti', age: 24},
   {id: 'dfbj', name: 'Shiksha', age: 21},
   {id: 'sdikm', name: 'Buddy', age: 4}
   ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
}   
  
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //setState may not be called instantly
    //for operations not depending on prevState, use the passing object syntax
    //otherwise use the arrow function syntax
    this.setState( (prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 //best practice for state update depending on old state
      }; 
    });
  }
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render () {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}/>;
    }

    return (
        <Aux>
          <button onClick={() => {
            this.setState({showCockpit: false});
          }}>Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler}}>
              {this.state.showCockpit ? (
                <Cockpit 
                  title = {this.props.appTitle}
                  showPersons={this.state.showPersons} 
                  personsLength={this.state.persons.length}
                  toggled={this.togglePersonsHandler} />
              ) : null }
              {persons}
          </AuthContext.Provider>
        </Aux>
    );
  }
}

export default withClass(App, classes.App);



 