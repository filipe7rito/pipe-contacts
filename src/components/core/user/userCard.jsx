import React, { Component } from 'react';
import avatar from './../../../assets/avatar_128.jpg';

import './userCard.css';

class UserCard extends Component {
  state = {};

  render() {
    const { name, org_name: organization, picture_id } = this.props.user;

    return (
      <div className="card">
        <div className="row no-gutters">
          <div className="col-md-2">
            <div className="card-body">
              <h6 onClick={this.props.onClick} className="card-title">
                {name}
              </h6>
              <div className="card-text">
                <i
                  className="fa fa-building mr-1 text-muted"
                  aria-hidden="true"
                />
                <small className="text-muted">{organization}</small>
              </div>
            </div>
          </div>
          <div className="col-md-10" style={{ alignSelf: 'center' }}>
            <img
              className="avatar"
              src={picture_id ? picture_id.pictures['128'] : avatar}
              alt="avatar"
              onClick={this.props.onClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
