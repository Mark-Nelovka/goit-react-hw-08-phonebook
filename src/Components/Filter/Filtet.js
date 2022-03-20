import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/contacts/actions';
import s from './filter.module.css';
export default function Filter() {
  const value = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const onChange = e => {
    return dispatch(actions.filterName(e.currentTarget.value));
  };

  return (
    <label>
      <input
        className={s.inputFilter}
        onChange={onChange}
        type="text"
        name="filter"
        value={value}
        placeholder="Search for a contact by name"
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
