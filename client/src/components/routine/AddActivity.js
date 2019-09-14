import React, { useState, useContext } from 'react';
import RoutineContext from '../../context/routine/routineContext';
import options from './activityOptions';
const AddActivity = ({ day }) => {
  const routineContext = useContext(RoutineContext);

  const { current, addActivity } = routineContext;

  const id = current._id;

  const initalState = {
    name: '',
    from: '',
    icon: '',
    to: ''
  };
  const [activity, setActivity] = useState(initalState);

  const { name, from, to } = activity;

  const onChange = e => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const newActivity = {
      name,
      icon: options[name].icon,
      from,
      to
    };
    addActivity(id, day, newActivity);
    setActivity(initalState);
  };

  return (
    <form className='activity' onSubmit={onSubmit}>
      <div className='activity__icon'>
        {name === '' ? (
          <i className='far fa-circle fa-fw' />
        ) : (
          <i className={`${options[name].icon} fa-fw`} />
        )}
      </div>
      <div className='activity__content'>
        <select className='activity__select' name='name' onChange={onChange}>
          {Object.values(options).map(option => (
            <option
              className='activity__option'
              value={option.name}
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
        <i className='fas fa-plus'></i>
      </button>
    </form>
  );
};

export default AddActivity;
