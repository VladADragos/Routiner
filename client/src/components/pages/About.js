import React, { Fragment } from "react";

const Headings = () => (
  <Fragment>
    {" "}
    <h1 className='about__header'>Routiner</h1>
    <h2 className='about__sub-header'>The fullstack productivity web-app</h2>
    <h2 className='about__sub-sub-header'>
      Made by Vlad Dragos.{" "}
      <a href='https://github.com/VladADragos/routiner'>Github</a>,{" "}
      <a href='https://vladdragos.com'>Website</a>,{" "}
      <a href='emailto:vladinatorr@gmail.com'>Email</a>
    </h2>
  </Fragment>
);

const Paragraph = ({ title, children }) => (
  <div className='about__text'>
    <h3 className='about__text-header'>{title}:</h3>
    <p className='about__text-p'>{children}</p>
  </div>
);

const About = () => {
  return (
    <section className='about'>
      <Headings />
      <Paragraph title='Background'>
        I decided to make this application because i wanted to make a fullstack
        app in order to hone my web development skills. The reason why i chose
        to make a productivity app was because it seemed quite straight forward
        while at the same time being complex and allowing for creative freedom.
      </Paragraph>
      <Paragraph title='Tech stack'>
        I chose to use React for the front-end, Express for the back-end, and
        Mongodb for storage. This stack was chosen because it makes use of
        javascript in all frameworks allowing for a frictionless developing
        experience.
      </Paragraph>
      <Paragraph title='Front-end'>
        There exist several viable javascript front-end frameworks/library such
        as Angular and Vue, but React was chosen as it was the library i was
        most knowledgeable in. This application makes use of React 16 and uses
        entirely functional components. Context and hooks are used for state
        managements. Sass is used for scalable styling.
      </Paragraph>
      <Paragraph title='Back-end'>
        Express was chosen as for the back-end as it is very simple and
        lighweight. The backend consists of a restfull api that interacts with
        the database and the front-end. Bcrypt and Jwt are used for
        authentication. Mongoose is used in order to make database interaction
        even more seamless. Express-validator is used for validation and error
        management.
      </Paragraph>
    </section>
  );
};

export default About;
