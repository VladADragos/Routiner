import React, { useContext, useState } from 'react';
import RoutineContext from '../../context/routine/routineContext';

const RoutineForm = () => {
  const routineContext = useContext(RoutineContext);

  const { addRoutine } = routineContext;

  const initialState = {
    name: null,
    season: 'winter'
  };
  const [routine, setRoutine] = useState(initialState);

  const onChange = e =>
    setRoutine({ ...routine, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addRoutine(routine);
    setRoutine(initialState);
  };
  const { name, season } = routine;
  return (
    <div className={`routine-item ${season}`}>
      <h2 className='routine-item__header'> {name ? name : 'Add Routine'}</h2>
      <form className='routine-form' onSubmit={onSubmit}>
        <div>
          <div className='form-group input-group'>
            <label htmlFor='name'>Name:</label>
            <input onChange={onChange} type='text' name='name' />
          </div>
          <div className='season-select'>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='winter'
              id='winter'
              checked={season === 'winter' ? true : false}
            />
            <div className='season-select__option' data-season='winter'>
              <label htmlFor='winter'>
                <i className='fas fa-snowflake'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='autumn'
              id='autumn'
            />
            <div className='season-select__option' data-season='autumn'>
              <label htmlFor='autumn'>
                <i className='fas fa-mountain'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='spring'
              id='spring'
            />
            <div className='season-select__option' data-season='spring'>
              <label htmlFor='spring'>
                <i className='fas fa-leaf'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='summer'
              id='summer'
            />
            <div className='season-select__option' data-season='summer'>
              <label htmlFor='summer'>
                <i className='fas fa-sun'></i>
              </label>
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Add'
          className='routine-item__button btn btn--add'
        />
      </form>
    </div>
  );
};

export default RoutineForm;
