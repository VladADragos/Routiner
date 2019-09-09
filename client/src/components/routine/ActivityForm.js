import React, { useState } from 'react';

const ActivityForm = props => {
  const options = [
    {
      name: 'Angular',
      icon: 'angular'
    },
    {
      name: 'PHP',
      icon: 'php'
    },
    {
      name: 'Python',
      icon: 'python'
    },
    {
      name: 'Raspberrypi',
      icon: 'raspberry-pi'
    },
    {
      name: 'Vue',
      icon: 'vuejs'
    },
    {
      name: 'React',
      icon: 'react'
    },
    {
      name: 'Node',
      icon: 'node-js'
    },
    {
      name: 'Sass',
      icon: 'sass'
    },
    {
      name: 'Laravel',
      icon: 'laravel'
    },
    {
      name: 'JavaScript',
      icon: 'js'
    },
    {
      name: 'Ember',
      icon: 'ember'
    },
    {
      name: 'Docker',
      icon: 'docker'
    }
  ];

  const initalState = {
    name: '',
    from: '',
    to: ''
  };
  const [activity, setActivity] = useState(initalState);

  const { name, from, to } = activity;

  const onChange = e => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
    console.log(name == '');
  };
  return (
    <form className='activity'>
      <div className='activity__icon'>
        {name == '' ? (
          <i className='far fa-circle' />
        ) : (
          <i className={`fab fa-${name}`} />
        )}
      </div>
      <div className='activity__content'>
        <select className='activity__select' name='name' onChange={onChange}>
          <option value='' disabled selected>
            Add activity
          </option>

          {options.map(option => (
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
            <input type='time' name='from' onChange={onChange} />
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
