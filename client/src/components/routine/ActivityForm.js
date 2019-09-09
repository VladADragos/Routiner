import React, { useState, useContext } from 'react';
import RoutineContext from '../../context/routine/routineContext';
const ActivityForm = props => {
  const routineContext = useContext(RoutineContext);

  const { current, addActivity } = routineContext;

  const id = current._id;

  const options = {
    Angular: {
      name: 'Angular',
      icon: 'fab fa-angular'
    },
    Php: {
      name: 'Php',
      icon: 'fab fa-php'
    },
    Python: {
      name: 'Python',
      icon: 'fab fa-python'
    },
    Raspberrypi: {
      name: 'Raspberrypi',
      icon: 'fab fa-raspberry-pi'
    },
    Vue: {
      name: 'Vue',
      icon: 'fab fa-vuejs'
    },
    React: {
      name: 'React',
      icon: 'fab fa-react'
    },
    Node: {
      name: 'Node',
      icon: 'fab fa-node-js'
    },
    Sass: {
      name: 'Sass',
      icon: 'fab fa-sass'
    },
    Laravel: {
      name: 'Laravel',
      icon: 'fab fa-laravel'
    },
    JavaScript: {
      name: 'JavaScript',
      icon: 'fab fa-js'
    },
    Ember: {
      name: 'Ember',
      icon: 'fab fa-ember'
    },
    Docker: {
      name: 'Docker',
      icon: 'fab fa-docker'
    },
    Css: {
      name: 'Css',
      icon: 'fab fa-css3-alt'
    },
    Wordpress: {
      name: 'Wordpress',
      icon: 'fab fa-wordpress-simple'
    },
    Break: {
      name: 'Break',
      icon: 'fas fa-mug-hot'
    },
    Breakfast: {
      name: 'Breakfast',
      icon: 'fas fa-bacon'
    },
    Lunch: {
      name: 'Lunch',
      icon: 'fas fa-pizza-slice'
    },
    Dinner: {
      name: 'Dinner',
      icon: 'fas fa-pizza-slice'
    },
    Sleep: {
      name: 'Sleep',
      icon: 'fas fa-bed'
    }
  };
  const initalState = {
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

    const newActivity = {
      name,
      icon: options[name].icon,
      from,
      to
    };
    const day = 'monday';
    addActivity(id, day, newActivity);
  };

  return (
    <form className='activity' onSubmit={onSubmit}>
      <div className='activity__icon'>
        {name == '' ? (
          <i className='far fa-circle' />
        ) : (
          <i className={`${options[name].icon}`} />
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
            <input type='time' name='from' onChange={onChange} />
          </p>
          <p>
            To:
            <input type='time' name='to' onChange={onChange} />
          </p>
        </div>
      </div>
      <button className='activity__add btn'>
        <i className='fas fa-plus'></i>
      </button>
    </form>
  );
};

export default ActivityForm;
