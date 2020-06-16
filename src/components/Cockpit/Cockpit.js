import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log("[Cockpit.js] Context - " + authContext.authenticated);
  //Executes for every render cycle(componentDidMount + componentDidUpdate)
  //Add empty list to run once, otherwise add changed dependency(one or multiple)
  useEffect (() => {
    console.log('[Cockpit.js] useEffect');
    // const timer = setTimeout(() => {
    //   alert('Saved data to cloud!');
    // }, 3000);
    toggleBtnRef.current.click();
    return () => {
      //clearTimeout(timer); // clearing timer so alert doesn't show if cockpit is removed.
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
      <button ref={toggleBtnRef}
          className={btnClass}
          onClick={props.toggled}>Toggle Persons</button>
      <button onClick={authContext.login}>Log-in</button> 
    </div>
  );

}

//React Memo stores snapshot of cockpit and only re-renders it
//if its input changes
//Optimisation for Functional Components
export default React.memo(cockpit); 