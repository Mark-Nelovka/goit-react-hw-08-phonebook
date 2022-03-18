import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux'
import actions from "redux/contacts/actions";
export default function Filter() {
  const value = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const onChange = (e) => {
    return dispatch(actions.filterName(e.currentTarget.value))
  }

  return (
    <label>
      <input onChange={onChange} type="text" name="filter" value={value} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

