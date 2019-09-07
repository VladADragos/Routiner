import React, { Fragment, useContext, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import RoutineItem from '../routine/RoutineItem';
import UserContext from '../../context/user/userContext';
import RoutineContext from '../../context/routine/routineContext';
import RoutineForm from '../routine/RoutineForm';
const Landing = props => {
  const userContext = useContext(UserContext);
  const routineContext = useContext(RoutineContext);
  const { loadUser } = userContext;
  const { routines, loadRoutines, isLoading } = routineContext;

  useEffect(() => {
    loadUser();
    loadRoutines();
    // eslint-disable-next-line
  }, []);

  if (!isLoading) {
    return (
      <Fragment>
        <Navbar />

        <div className='routines-grid'>
          <RoutineForm />
          {routines.map(routine => (
            <RoutineItem
              key={routine._id}
              season={routine.season}
              routine={routine}
            />
          ))}
        </div>
      </Fragment>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default Landing;
