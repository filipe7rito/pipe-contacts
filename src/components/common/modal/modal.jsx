import React from 'react';
import './../modal/modal.css';

const ModalHeader = props => {
  return (
    <div className="modalHeader">
      <div className="modalTitle">{props.title}</div>
      <i
        className="fa fa-times closeIcon"
        onClick={props.closeModal}
        aria-hidden="true"
      />
    </div>
  );
};

const Modal = props => {
  return (
    <div className="modal-outter">
      <div className="modal_inner">
        <ModalHeader title={props.title} closeModal={props.closeModal} />
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
