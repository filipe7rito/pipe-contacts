import React, { Component } from 'react';
import './newUser.css';
import { getOrganizations } from './../../../services/organization';

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
    },
    errors: {}
  };

  async componentDidMount() {
    const { data: response } = await getOrganizations();

    this.setState({
      organizations: response.data
    });
  }

  validate = () => {
    const errors = {};
    const { user } = this.state;

    //E-mail
    if (user.name.trim() === '') {
      errors.name = 'Name is required.';
    }

    //E-mail
    if (user.email.trim() === '') {
      errors.email = 'E-mail is required.';
    } else if (!user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.email = 'E-mail format is invalid.';
    }

    //Phone
    if (user.phone.trim().length > 0 && user.phone.length < 9) {
      errors.phone = 'Phone should have at least 9 digits.';
    } else if (user.phone.length > 9) {
      errors.phone = 'Phone should not have more than 9 digits.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    //Name
    if (name === 'name') {
      if (value.trim() === '') {
        return 'Name is required.';
      }
    }

    //E-mail
    if (name === 'email') {
      if (value.trim() === '') {
        return 'E-mail is required.';
      }
      let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!emailValid) {
        return 'E-mail format is invalid.';
      }
    }

    if (name === 'phone') {
      if (value.trim().length > 0 && value.length < 9) {
        return 'Phone should have at least 9 digits.';
      } else if (value.length > 9) {
        return 'Phone should not have more than 9 digits.';
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const user = { ...this.state.user };

    user[input.name] = input.value;
    this.setState({ user, errors });
  };

  handleSubmit = e => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

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
    const { user, organizations, errors } = this.state;

    return (
      <div className="card card-create">
        <div className="body-create m-3">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-3 label-create">Name</label>
              <input
                autoFocus
                type="text"
                name="name"
                value={user.name}
                onChange={this.handleChange}
                className={this.getClassName(errors.name)}
                placeholder="ex: Edgar Davids"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={this.handleChange}
                className={this.getClassName(errors.email)}
                placeholder="ex: email@domain.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Phone</label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={this.handleChange}
                className={this.getClassName(errors.phone)}
                placeholder="ex: 917952333"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <div className="form-group row">
              <label className="col-3 label-create">Organization</label>
              <select
                name="org_id"
                onChange={this.handleChange}
                className="form-control col-7"
              >
                <option value="" selected>
                  Select organization
                </option>
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
                placeholder="ex: Assistant"
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
                placeholder="ex: Groups"
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
                placeholder="ex: Location"
              />
            </div>
          </form>
        </div>
        <div className="footer-create">
          <button
            //onClick={() => this.handleSubmit()}
            onClick={() => this.props.onCreate(this.handleSubmit())}
            className="btn btn-success btn-sm create-btn"
          >
            Create
          </button>
        </div>
      </div>
    );
  }

  getClassName = errorMessage => {
    let className = 'form-control col-7';
    return errorMessage ? className + ' is-invalid' : className;
  };
}

export default NewUser;
