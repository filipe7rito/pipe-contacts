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
            <div className="value-details text-muted">
              {organization ? organization.name : ''}
            </div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Assistant</label>
            <div className="value-details text-muted">
              {props.selectedUser['409ce12c11577f1a322d2374852d80313a717598']}
            </div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Groups</label>
            <div className="value-details text-muted">
              {props.selectedUser['adbc2dac9d522f7d460adb3b18a4452b3cad3294']}
            </div>
          </div>
          <div className="row">
            <label className="col-4 label-details">Location</label>
            <div className="value-details text-muted">
              {props.selectedUser['dc7ab009470c89c59d733503a72dff9f088712b1']}
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
