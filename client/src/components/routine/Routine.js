import React, { Fragment, useContext, useEffect } from 'react';

import Navbar from '../layout/Navbar';
import RoutineContext from '../../context/routine/routineContext';
import UserContext from '../../context/user/userContext';
import Activity from './Activity';

const Routine = props => {
  const routineContext = useContext(RoutineContext);
  const userContext = useContext(UserContext);

  const { loadRoutine, loadRoutines, current, isLoading } = routineContext;
  const { loadUser } = userContext;

  useEffect(() => {
    const fetchData = async () => {
      await loadUser();
      await loadRoutines();
      await loadRoutine(props.match.params.id);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (!isLoading && current != null) {
    return (
      <Fragment>
        <Navbar />
        <div className='routine-grid'>
          <div className='day day--selected'>
            <h2 className='day__header'>Monday</h2>
            <Activity activity='angular' />
            <Activity activity='vuejs' />
            <Activity activity='raspberry-pi' />
            <Activity activity='raspberry-pi' />
            <Activity activity='python' />
          </div>
          <div className='day'>asd</div>
          <div className='day'>asd</div>
          <div className='day'>asd</div>
          <div className='day'>asd</div>
        </div>
        ;
      </Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Routine;
