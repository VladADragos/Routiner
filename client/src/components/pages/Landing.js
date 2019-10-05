import React from "react";
import activity from "../../images/activity.jpg";
import routine1 from "../../images/routine1.jpg";
import routine2 from "../../images/routine2.jpg";
import routine3 from "../../images/routine3.jpg";
import routine4 from "../../images/routine4.jpg";

const Landing = () => {
  return (
    <div className='home'>
      <div className='cta'>
        <h1 className='cta__logo'>Routiner</h1>

        <a className='cta__button btn' href='./login'>
          LOGIN
        </a>
      </div>

      <img className='home__activity ' src={activity} alt='' />
      <img
        className='home__routine--1 home__routine shadow'
        src={routine1}
        alt=''
      />
      <img
        className='home__routine--3 home__routine shadow'
        src={routine3}
        alt=''
      />
      <img
        className='home__routine--4 home__routine shadow'
        src={routine4}
        alt=''
      />
    </div>
  );
};

export default Landing;
