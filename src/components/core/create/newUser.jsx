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
      ['409ce12c11577f1a322d2374852d80313a717598']: '',
      adbc2dac9d522f7d460adb3b18a4452b3cad3294: '',
      dc7ab009470c89c59d733503a72dff9f088712b1: ''
    }
  };

  async componentDidMount() {
    const { data: response } = await axios.get(
      'https://api.pipedrive.com/v1/organizations',
      {
        params: {
          api_token: '7a1120bb7e2deb97697d2011b0df8be007b34ca3'
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
                name="409ce12c11577f1a322d2374852d80313a717598"
                value={user['409ce12c11577f1a322d2374852d80313a717598']}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Assistant"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Groups</label>
              <input
                type="text"
                name="adbc2dac9d522f7d460adb3b18a4452b3cad3294"
                value={user.adbc2dac9d522f7d460adb3b18a4452b3cad3294}
                onChange={this.handleChange}
                className="form-control col-7"
                placeholder="Groups"
              />
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Location</label>
              <input
                type="text"
                name="dc7ab009470c89c59d733503a72dff9f088712b1"
                value={user.dc7ab009470c89c59d733503a72dff9f088712b1}
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
