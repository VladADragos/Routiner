import React, { useState } from 'react';
import options from './activityOptions';
const Activity = ({ activity, remove }) => {
  const onRemove = () => remove(activity._id);

  const initialState = false;
  const [showSetting, setShowSettings] = useState(initialState);

  const onClick = () => {
    setShowSettings(!showSetting);
  };

  return (
    <section className='activity'>
      <div className='activity__icon'>
        <i className={`fab fa-${options[activity.name].icon} fa-fw`} />
      </div>
      <div className='activity__content'>
        <h3 className='activity__header'>{activity.name}</h3>
        <div className='activity__time'>
          <p>From: {activity.from}</p>
          <p>To: {activity.to}</p>
        </div>
      </div>
      <div className='.activity__settings-container'>
        <button className='activity__edit btn' onClick={onClick}>
          <i className='fas fa-ellipsis-v'></i>
        </button>
        {showSetting && (
          <ul className='activity__settings'>
            <button className='activity__settings-option btn'>
              <li>Edit</li>
            </button>
            <button
              className='activity__settings-option btn'
              onClick={onRemove}>
              <li>Delete</li>
            </button>
          </ul>
        )}
      </div>
    </section>
  );
};

export default Activity;
