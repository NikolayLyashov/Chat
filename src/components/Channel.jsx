import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/slices';

export const Channel = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const { id, name } = props;
  const { currentChannelId } = useSelector((state) => state.channelsReducer);

  return (
    <li className="nav-item" role="presentation" onClick={() => dispatch(actions.changeCurrentChannelID(id))}>
      <button type="button" className={`w-100 px-4 rounded-0 text-start btn ${cn({ 'btn-secondary': id === currentChannelId })}`}>
        <span className="me-3">#</span>
        {name}
      </button>
    </li>
  );
};

Channel.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
};

Channel.defaultProps = {
  name: '',
  id: 1,
};

export default Channel;
