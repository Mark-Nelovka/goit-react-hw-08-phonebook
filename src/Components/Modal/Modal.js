import s from "./Modal.module.css";
import PropTypes from "prop-types";
export default function WindowModal({ modalRemove, onDelete, dontDelete }) {
  return (
    <div className={s.backdrop}>
      <div className={s.div}>
        <p>{`Вы уверены что хотиеть удалить ${modalRemove.name} из списка контактов?`}</p>
        <button
          className={s.btnYes}
          type="button"
          onClick={() => onDelete(modalRemove.id)}
        >
          Yes
        </button>
        <button className={s.btnNo} type="button" onClick={() => dontDelete()}>
          No
        </button>
      </div>
    </div>
  );
}

WindowModal.propTypes = {
  modalRemove: PropTypes.object,
  onDelete: PropTypes.func,
  dontDelete: PropTypes.func,
};
