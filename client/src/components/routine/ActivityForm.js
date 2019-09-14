import React, { useState, useContext } from 'react';
import RoutineContext from '../../context/routine/routineContext';
import options from './activityOptions';
const ActivityForm = ({ day, edit, values }) => {
  const routineContext = useContext(RoutineContext);

  const { current, addActivity, updateActivity } = routineContext;

  const id = current._id;

  const initalState = values || {
    name: '',
    from: '',
    icon: '',
    to: ''
  };
  const [activity, setActivity] = useState(initalState);

  const { name, icon, from, to } = activity;

  const onChange = e => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!edit) {
      addActivity(id, day, activity);
      setActivity(initalState);
    } else {
      updateActivity(activity, current._id, day);
      edit();
    }
  };

  return (
    <form className='activity' onSubmit={onSubmit}>
      <div className='activity__icon'>
        {name == '' ? (
          <i className='far fa-circle fa-fw' />
        ) : (
          <i className={`${options[name].icon} fa-fw`} />
        )}
      </div>
      <div className='activity__content'>
        <select
          className='activity__select'
          name='name'
          onChange={onChange}
          value={values.name}>
          {Object.values(options).map(option => (
            <option
              //   selected={values && values.name == option.name ? true : false}
              className='activity__option'
              value={option.name}
              name={option.name}
              key={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <div className='activity__time'>
          <p>
            From:
            <input type='time' name='from' onChange={onChange} value={from} />
          </p>
          <p>
            To:
            <input type='time' name='to' onChange={onChange} value={to} />
          </p>
        </div>
      </div>
      <button className='activity__add btn'>
        {values ? (
          <i className='fas fa-check' />
        ) : (
          <i className='fas fa-plus' />
        )}
      </button>
    </form>
  );
};

export default ActivityForm;
