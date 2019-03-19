import React, { Component } from 'react';
import axios from 'axios';
import './newUser.css';

class NewUser extends Component {
  state = {
    organizations: [],
    user: {
      name: '',
      email: '',
      phone: '',
      org_id: '',
      ['32bceb204b52cac80f344ee27be67030cf7da6c0']: '',
      ba94da5249bdee6f021ab2976302754f9aafab63: '',
      a4d32cea59d827bd0a13ed0f3f2b4793f9637096: ''
    }
  };

  async componentDidMount() {
    const { data: response } = await axios.get(
      'https://api.pipedrive.com/v1/organizations',
      {
        params: {
          api_token: 'b57643096b0f4ed34ac5fd734fc73ea25a8e0043'
        }
      }
    );

    this.setState({
      organizations: response.data
    });
  }

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };

    user[input.name] = input.value;
    this.setState({ user });
  };

  handleSubmit = () => {
    let newUser = { ...this.state.user };
    const email = newUser.email;
    const phone = newUser.phone;

    newUser.email = [
      {
        label: 'work',
        primary: true,
        value: email
      }
    ];

    newUser.phone = [
      {
        label: 'work',
        primary: true,
        value: phone
      }
    ];

    return newUser;
  };

  render() {
    const { user, organizations } = this.state;

    return (
      <div className="card card-create">
        <div className="body-create m-3">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-3 label-create">Name</label>
              <input
                autoFocus
                required
                type="text"
                name="name"
                value={user.name}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Name"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Email"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Phone"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Organization</label>
              <option value="" />
              <select
                name="org_id"
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Organization"
              >
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
                <option />
              </select>
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Assistant</label>
              <input
                type="text"
                name="32bceb204b52cac80f344ee27be67030cf7da6c0"
                value={user['32bceb204b52cac80f344ee27be67030cf7da6c0']}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Assistant"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Groups</label>
              <input
                type="text"
                name="ba94da5249bdee6f021ab2976302754f9aafab63"
                value={user.ba94da5249bdee6f021ab2976302754f9aafab63}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Groups"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Location</label>
              <input
                type="text"
                name="a4d32cea59d827bd0a13ed0f3f2b4793f9637096"
                value={user.a4d32cea59d827bd0a13ed0f3f2b4793f9637096}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Location"
              />
            </div>
          </form>
        </div>
        <div className="footer-create">
          <button
            disabled={user.name.length === 0}
            onClick={() => this.props.onCreate(this.handleSubmit())}
            className="btn btn-success btn-sm create-btn"
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default NewUser;
