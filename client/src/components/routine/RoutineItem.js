import React, { useContext, useState, Fragment } from 'react';
import RoutineContext from '../../context/routine/routineContext';
import { Link } from 'react-router-dom';
const RoutineItem = ({ season = 'winter', routine }) => {
  const routineContext = useContext(RoutineContext);

  const { removeRoutine, updateRoutine, selectRoutine } = routineContext;

  const initialState = {
    isEditing: false,
    name: routine.name,
    season: routine.season
  };
  const [state, setState] = useState(initialState);
  const { isEditing } = state;

  const onDelete = () => {
    removeRoutine(routine._id);
  };
  const onEdit = () => {
    setState({ ...state, isEditing: !isEditing });
  };

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateRoutine({ _id: routine._id, name: state.name, season: state.season });
    onEdit();
  };

  const onView = () => {
    selectRoutine(routine);
    // props.history.push('/home');
  };
  return (
    <div className={`routine-item ${state.season}`}>
      <h2 className='routine-item__header'>
        {state.name === '' ? '_' : state.name}
      </h2>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              onChange={onChange}
              type='text'
              name='name'
              value={state.name}
            />
          </div>
          <div className='form-group radio-group'>
            <input
              onChange={onChange}
              type='radio'
              name='season'
              value='winter'
              id='winter'
              checked={state.season === 'winter' ? true : false}
            />
            <label htmlFor='winter'>Winter</label>
            <input
              onChange={onChange}
              type='radio'
              name='season'
              value='autumn'
              id='autumn'
              checked={state.season === 'autumn' ? true : false}
            />
            <label htmlFor='autumn'>Autumn</label>
            <input
              onChange={onChange}
              type='radio'
              name='season'
              value='spring'
              id='spring'
              checked={state.season === 'spring' ? true : false}
            />
            <label htmlFor='spring'>Spring</label>
            <input
              onChange={onChange}
              type='radio'
              name='season'
              value='summer'
              id='summer'
              checked={state.season === 'summer' ? true : false}
            />
            <label htmlFor='summer'>Summer</label>
          </div>
          <div className='routine-item__buttons'>
            <button className='routine-item__button btn' onClick={onDelete}>
              Delete
            </button>
            <input
              type='submit'
              className='routine-item__button btn'
              value='Save'
            />
          </div>{' '}
        </form>
      ) : (
        <Fragment>
          {' '}
          <ol className='routine-item__list'>
            <h3>Biggest activities</h3>
            <li>1. Cpp</li>
            <li>2. Php</li>
            <li>3. React</li>
          </ol>
          <div className='routine-item__buttons'>
            <Link
              to={`/routine/${routine._id}`}
              className='routine-item__button btn'
              onClick={onView}>
              View
            </Link>
            <button className='routine-item__button btn' onClick={onEdit}>
              Edit
            </button>
          </div>{' '}
        </Fragment>
      )}
    </div>
  );
};

export default RoutineItem;