import React, { useContext, useState, useEffect } from "react";
import RoutineContext from "../../context/routine/routineContext";
import UserContext from "../../context/user/userContext";

import Day from "./Day";

const Routine = props => {
  const routineContext = useContext(RoutineContext);
  const userContext = useContext(UserContext);

  const { loadRoutine, loadRoutines, current, isLoading } = routineContext;
  const { loadUser } = userContext;

  const initialState = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];
  const [days, setDays] = useState(initialState);
  useEffect(() => {
    const fetchData = async () => {
      await loadUser();
      await loadRoutines();
      await loadRoutine(props.match.params.id);
    };

    fetchData();

    // eslint-disable-next-line
  }, []);

  const selectDay = day => {
    const index = days.indexOf(day);

    // const toDay = days[index];
    // days[0] = toDay;
    const [from, to] = [days[0], days[index]];

    days[index] = from;
    days[0] = to;
    setDays([...days]);
    console.log(days);
  };

  // setDays(Object.keys(current.days));

  if (!isLoading && current !== null) {
    return (
      <div className='routine-grid'>
        <Day
          main={true}
          activities={current.days[days[0]]}
          day={days[0]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[1]]}
          day={days[1]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[2]]}
          day={days[2]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[3]]}
          day={days[3]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[4]]}
          day={days[4]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[5]]}
          day={days[5]}
          selectDay={selectDay}
        />
        <Day
          activities={current.days[days[6]]}
          day={days[6]}
          selectDay={selectDay}
        />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Routine;
