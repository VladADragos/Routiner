import React, { useContext, useState, Fragment } from "react";
import RoutineContext from "../../context/routine/routineContext";
import { Link } from "react-router-dom";
const RoutineItem = ({ season = "winter", routine }) => {
  const routineContext = useContext(RoutineContext);

  const { removeRoutine, updateRoutine, selectRoutine } = routineContext;

  const initialState = {
    isEditing: false,
    name: routine.name,
    season: routine.season
  };
  const [state, setState] = useState(initialState);
  const [isValid, setIsValid] = useState(true);
  const { isEditing } = state;

  const onDelete = e => {
    e.preventDefault();
    removeRoutine(routine._id);
  };
  const onEdit = () => {
    setState({ ...state, isEditing: !isEditing });
  };

  const onChange = e => {
    if (e.target.value.length <= 22) {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    if (state.name.length > 0) {
      updateRoutine({
        _id: routine._id,
        name: state.name,
        season: state.season
      });
      onEdit();
    } else {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
      }, 1500);
    }
  };

  const onView = () => {
    selectRoutine(routine);
  };

  return (
    <div className={`routine-item ${state.season}`}>
      <h2 className='routine-item__header'>
        {state.name === "" ? "_" : state.name}
      </h2>

      {isEditing ? (
        <form className='routine-form' onSubmit={onSubmit}>
          <div>
            <div className='form-group input-group'>
              <input
                className={!isValid ? "alert-warning" : ""}
                onChange={onChange}
                type='text'
                name='name'
                value={state.name}
              />
            </div>
            <div className='season-select'>
              <input
                className='hidden'
                onChange={onChange}
                type='radio'
                name='season'
                value='winter'
                id='winter'
                checked={state.season === "winter" ? true : false}
              />
              <div className='season-select__option' data-season='winter'>
                <label htmlFor='winter'>
                  <i className='fas fa-snowflake fa-fw'></i>
                </label>
              </div>
              <input
                className='hidden'
                onChange={onChange}
                type='radio'
                name='season'
                value='autumn'
                id='autumn'
                checked={state.season === "autumn" ? true : false}
              />
              <div className='season-select__option' data-season='autumn'>
                <label htmlFor='autumn'>
                  <i className='fab fa-canadian-maple-leaf fa-fw'></i>
                </label>
              </div>
              <input
                className='hidden'
                onChange={onChange}
                type='radio'
                name='season'
                value='spring'
                id='spring'
                checked={state.season === "spring" ? true : false}
              />
              <div className='season-select__option' data-season='spring'>
                <label htmlFor='spring'>
                  <i className='fas fa-leaf fa-fw'></i>
                </label>
              </div>
              <input
                className='hidden'
                onChange={onChange}
                type='radio'
                name='season'
                value='summer'
                id='summer'
                checked={state.season === "summer" ? true : false}
              />
              <div className='season-select__option' data-season='summer'>
                <label htmlFor='summer'>
                  <i className='fas fa-sun fa-fw'></i>
                </label>
              </div>
            </div>
          </div>
          <div className='routine-item__buttons routine-item__buttons--edit'>
            <button className='routine-item__button btn' onClick={onDelete}>
              Delete
            </button>
            <input
              type='submit'
              className='routine-item__button btn'
              value='Save'
            />
          </div>{" "}
        </form>
      ) : (
        <Fragment>
          {routine.biggestActivities.length > 0 ? (
            <ol className='routine-item__list'>
              <h3>Biggest activities</h3>
              {routine.biggestActivities.map((activity, index) => (
                <li key={activity.activity}>
                  {index + 1}. {activity.activity}{" "}
                  {activity.duration >= 60
                    ? `${Math.floor(activity.duration / 60)} hours`
                    : `${activity.duration} minutes`}
                </li>
              ))}
            </ol>
          ) : (
            <h3>No activities found</h3>
          )}{" "}
          <div className='routine-item__buttons'>
            <Link
              to={`/routine/${routine._id}`}
              className='routine-item__button btn'
              onClick={onView}
            >
              View
            </Link>
            <button className='routine-item__button btn' onClick={onEdit}>
              Edit
            </button>
          </div>{" "}
        </Fragment>
      )}
    </div>
  );
};

export default RoutineItem;
