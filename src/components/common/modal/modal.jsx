import React from 'react';
import './../modal/modal.css';

const ModalHeader = props => {
  return (
    <div className="modalHeader">
      <div className="modalTitle">{props.title}</div>
      <i
        className="fa fa-times closeIcon"
        onClick={props.closePopup}
        aria-hidden="true"
      />
    </div>
  );
};

const Modal = props => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <ModalHeader title={props.title} closePopup={props.closePopup} />
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
