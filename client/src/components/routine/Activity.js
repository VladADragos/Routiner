import React from 'react';

const Activity = props => {
  return (
    <section className='activity'>
      <div className='activity__icon'>
        <i className={`fab fa-${props.activity}`}></i>
      </div>
      <div className='activity__content'>
        <h3 className='activity__header'>Activity</h3>
        <div className='activity__time'>
          <p>From: 13:30</p>
          <p>To: 14:30</p>
        </div>
      </div>
      <button className='activity__edit btn'>
        <i className='fas fa-ellipsis-v'></i>
      </button>
    </section>
  );
};

export default Activity;
