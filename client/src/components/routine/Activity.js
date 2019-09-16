import React, { useState } from 'react';
import options from './activityOptions';
import ActivityForm from './ActivityForm';
const Activity = ({ activity, remove, day }) => {
  const onRemove = () => remove(activity._id);

  const [showSetting, setShowSettings] = useState(false);

  const onClick = () => {
    setShowSettings(!showSetting);
  };

  const [isEditing, setIsEditing] = useState(false);
  // const initialState = false;
  const edit = () => {
    setIsEditing(!isEditing);
    setShowSettings(false);
  };
  if (!isEditing) {
    return (
      <section className='activity'>
        <div className='activity__icon'>
          <i className={`${options[activity.name].icon} fa-fw`} />
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
              <button className='activity__settings-option btn' onClick={edit}>
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
  } else {
    return <ActivityForm day={day} edit={edit} values={activity} />;
  }
};

export default Activity;
