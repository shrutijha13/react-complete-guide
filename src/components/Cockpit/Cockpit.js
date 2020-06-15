import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  
  useEffect (() => {
    console.log('[Cockpit.js] useEffect');
    //Executes for every render cycle(componentDidMount + componentDidUpdate)
    //Add empty list to run once, otherwise add changed dependency(one or multiple)
    const timer = setTimeout(() => {
      alert('Saved data to cloud!');
    }, 3000);
    return () => {
      clearTimeout(timer); // clearing timer so alert doesn't show if cockpit is removed.
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  })

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }

  if(props.personsLength <=1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button 
          className={btnClass}
          onClick={props.toggled}>Toggle Persons</button>
    </div>
  );

}

//React Memo stores snapshot of cockpit and only re-renders it
//if its input changes
//Optimisation for Functional Components
export default React.memo(cockpit); 