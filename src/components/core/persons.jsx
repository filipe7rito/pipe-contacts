import React, { Component } from 'react';
import PersonsTable from './personsTable';
import Modal from '../common//modal/modal';
import UserDetails from './details/userDetails';
import Search from '../common/search/search';
import Pagination from '../common/pagination/pagination';
import NewUser from './create/newUser';
import { getUsers } from './../../services/contacts';
import { createUser } from './../../services/contacts';
import { deleteUser } from './../../services/contacts';
import { findUser } from './../../services/contacts';

class Persons extends Component {
  state = {
    users: [],
    filteredUsers: [],
    selectedUser: {},
    pagination: {},
    limit: 10,
    showDetails: false,
    showCreationForm: false
  };

  async componentDidMount() {
    this.getUsers();
  }

  async getUsers(startNumber) {
    const { data: response } = await getUsers(startNumber, this.state.limit);

    const responseData = response.data;

    this.setState({
      users: responseData,
      filteredUsers: responseData,
      pagination: response.additional_data.pagination
    });
  }

  async delete(user_id) {
    const { data: response } = await deleteUser(user_id);

    const users = this.state.filteredUsers.filter(
      user => user.id !== response.data.id
    );

    this.setState({
      users,
      filteredUsers: users
    });
  }

  async create(user) {
    const { data: response } = await createUser(user);
    const responseData = response.data;

    const users = [...this.state.users];
    users.splice(0, 0, responseData);

    this.setState({
      users,
      filteredUsers: users
    });
  }

  async findUser(term) {
    const { data: response } = await findUser(term);
    const responseData = response.data ? response.data : [];

    this.setState({
      users: responseData,
      filteredUsers: responseData,
      pagination: response.additional_data.pagination
    });
  }

  handleSearch = e => {
    const query = e.target.value.toLowerCase();

    query.length >= 2 ? this.findUser(query) : this.getUsers();

    /*  //clone users list
    let users = [...this.state.users];

    //filter users list
    users = users.filter(user => user.name.toLowerCase().includes(query));

    //update filtered list with the new users list
    this.setState({ filteredUsers: users }); */
  };

  handleUserDetails = user => {
    document.body.style.overflow = 'auto';

    if (!this.state.showDetails) {
      document.body.style.overflow = 'hidden';
    }
    this.setState({ selectedUser: user, showDetails: !this.state.showDetails });
  };

  handleDeletePerson = () => {
    const { id: user_id } = this.state.selectedUser;

    this.delete(user_id);
    this.handleUserDetails({});
  };

  handleShowCreationForm = () => {
    if (!this.state.showDetails) {
      document.body.style.overflow = 'hidden';
    }

    this.setState({ showCreationForm: !this.state.showCreationForm });
  };

  handleCreate = user => {
    if (user) {
      document.body.style.overflow = 'auto';

      this.create(user);
      this.handleExitCreation();
    }
  };

  handleExitCreation = user => {
    if (!this.state.showCreationForm) {
      document.body.style.overflow = 'hidden';
    }

    this.setState({ showCreationForm: !this.state.showCreationForm });
  };

  handleDragStart = (e, index) => {
    e.stopPropagation();

    this.draggedItem = this.state.filteredUsers[index];
    e.dataTransfer.effectAllowed = 'move';
  };

  handleDragOver = (e, index) => {
    e.preventDefault();

    const draggedOverItem = this.state.filteredUsers[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let users = this.state.filteredUsers.filter(
      user => user !== this.draggedItem
    );

    // add the dragged item after the dragged over item
    users.splice(index, 0, this.draggedItem);

    this.setState({ filteredUsers: users });
  };

  handleDragEnd = () => {
    this.draggedItem = null;
  };

  render() {
    return (
      <div className="persons-container">
        <div>
          <h5 className="m-3">People's List</h5>
          <hr />
          <div className="row toolbar">
            <div className="col-10">
              <Search onChange={this.handleSearch} />
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary add-user"
                onClick={this.handleShowCreationForm}
              >
                Create user
              </button>
            </div>
          </div>
        </div>
        <div className="table-container">
          <PersonsTable
            users={this.state.filteredUsers}
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDragEnd={this.handleDragEnd}
            onClick={this.handleUserDetails}
          />
        </div>
        <Pagination
          paginationInfo={this.state.pagination}
          onClickNext={start => this.getUsers(start)}
          onClickPrevious={start => this.getUsers(start)}
        />
        {this.state.showDetails ? (
          <Modal title="Person Information" closeModal={this.handleUserDetails}>
            <UserDetails
              selectedUser={this.state.selectedUser}
              closeModal={this.handleUserDetails}
              deletePerson={this.handleDeletePerson}
            />
          </Modal>
        ) : null}
        {this.state.showCreationForm ? (
          <Modal title="New user" closeModal={this.handleExitCreation}>
            <NewUser onCreate={this.handleCreate} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Persons;
