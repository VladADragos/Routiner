import React, { useContext } from "react";
import Activity from "./Activity";
import RoutineContext from "../../context/routine/routineContext";
import ActivityForm from "./ActivityForm";
const Day = ({ main, activities, day, selectDay }) => {
  const routineContext = useContext(RoutineContext);
  const { current, removeActivity } = routineContext;
  const handleSwitch = () => {
    selectDay(day);
  };

  const handleActivityRemoval = activityId => {
    removeActivity(activityId, day, current._id);
  };
  if (main) {
    return (
      <div className='day day--selected'>
        <h2 className='day__header'>{day}</h2>
        <ActivityForm day={day} edit={false} />
        {/* <AddActivity day={day} /> */}
        {activities.map(activity => (
          <Activity
            key={activity._id}
            activity={activity}
            remove={handleActivityRemoval}
            day={day}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className='day'>
        <h2 className='day__header'>{day}</h2>

        {activities[0] && (
          <Activity
            key={activities[0]._id}
            activity={activities[0]}
            remove={handleActivityRemoval}
            day={day}
          />
        )}
        {activities[1] && (
          <Activity
            key={activities[1]._id}
            activity={activities[1]}
            remove={handleActivityRemoval}
            day={day}
          />
        )}
        {activities[2] && (
          <Activity
            key={activities[2]._id}
            activity={activities[2]}
            remove={handleActivityRemoval}
            day={day}
          />
        )}

        <button className='btn day__button' onClick={handleSwitch}>
          Switch
        </button>
      </div>
    );
  }
};

export default Day;
