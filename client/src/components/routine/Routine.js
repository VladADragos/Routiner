import React, { Fragment, useContext, useEffect } from 'react';

import Navbar from '../layout/Navbar';
import RoutineContext from '../../context/routine/routineContext';
import UserContext from '../../context/user/userContext';

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

  const log = () => {
    console.log(current);
  };

  if (!isLoading && current != null) {
    return (
      <Fragment>
        <Navbar />
        <div className='routine-grid'>testtets</div>;
        <button onClick={log}> click </button>
        {/* {
          routineContext.map()
        } */}
        {current.name}
      </Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Routine;
