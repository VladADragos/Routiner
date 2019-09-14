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
            <input
              onChange={onChange}
              type='text'
              name='name'
              placeholder='Add Routine'
            />
          </div>
          <div className='season-select'>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='winter'
              id='add-winter'
              checked={season === 'winter' ? true : false}
            />
            <div className='season-select__option' data-season='winter'>
              <label htmlFor='add-winter'>
                <i className='fas fa-snowflake fa-fw'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='autumn'
              id='add-autumn'
            />
            <div className='season-select__option' data-season='autumn'>
              <label htmlFor='add-autumn'>
                <i className='fab fa-canadian-maple-leaf fa-fw'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='spring'
              id='add-spring'
            />
            <div className='season-select__option' data-season='spring'>
              <label htmlFor='add-spring'>
                <i className='fas fa-leaf fa-fw'></i>
              </label>
            </div>
            <input
              className='hidden'
              onChange={onChange}
              type='radio'
              name='season'
              value='summer'
              id='add-summer'
            />
            <div className='season-select__option' data-season='summer'>
              <label htmlFor='add-summer'>
                <i className='fas fa-sun fa-fw'></i>
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
