import React, { useContext } from 'react';
import Activity from './Activity';
import AddActivity from './AddActivity';
import RoutineContext from '../../context/routine/routineContext';
const Day = ({ main, activities, day, selectDay }) => {
  const routineContext = useContext(RoutineContext);
  const { current, addActivity, removeActivity } = routineContext;
  const handleSwitch = () => {
    selectDay(day);
  };

  const handleActivityRemoval = activityId => {
    removeActivity(activityId, day, current._id);
  };
  if (main) {
    console.log(activities);
    return (
      <div className='day day--selected'>
        <h2 className='day__header'>{day}</h2>

        <AddActivity day={day} />
        {activities.map(activity => (
          <Activity
            key={activity._id}
            activity={activity}
            remove={handleActivityRemoval}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className='day'>
        <h2 className='day__header'>{day}</h2>

        {activities.map(activity => (
          <div>
            <Activity
              key={activity._id}
              activity={activity}
              remove={handleActivityRemoval}
            />
          </div>
        ))}
        <button className='btn day__button' onClick={handleSwitch}>
          Switch
        </button>
      </div>
    );
  }
};

export default Day;
