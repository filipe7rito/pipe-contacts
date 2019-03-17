import React from 'react';
import './userDetails.css';
import avatar from './../../../assets/avatar_128.jpg';

const UserDetails = props => {
  const {
    name,
    email,
    org_id: organization,
    picture_id,
    phone
  } = props.selectedUser;
  return (
    <div className="card card-details">
      <div className="image-panel">
        <img
          className="avatar-details"
          src={picture_id ? picture_id.pictures['128'] : avatar}
          alt="avatar"
        />
        <div className="name-details">{name}</div>
        <div className="contact-details">{phone[0].value}</div>
      </div>

      <div className="separator-details">
        <hr />
      </div>

      <div className="body-details">
        <form>
          <div className="row">
            <label className="col-4 label-details">Email</label>
            <div className="value-details text-muted">{email[0].value}</div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Organization</label>
            <div className="value-details text-muted">{organization.name}</div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Assistant</label>
            <div className="value-details text-muted">
              {props.selectedUser['32bceb204b52cac80f344ee27be67030cf7da6c0']}
            </div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Groups</label>
            <div className="value-details text-muted">
              {props.selectedUser['ba94da5249bdee6f021ab2976302754f9aafab63']}
            </div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Location</label>
            <div className="value-details text-muted">
              {props.selectedUser['a4d32cea59d827bd0a13ed0f3f2b4793f9637096']}
            </div>
          </div>
        </form>
      </div>
      <div className="footer-details">
        <button
          onClick={props.deletePerson}
          className="btn btn-danger btn-sm  delete-btn"
        >
          <i className="fa fa-trash" aria-hidden="true" /> Delete
        </button>
        <button
          onClick={props.closeModal}
          className="btn btn-secondary btn-sm back-btn"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
