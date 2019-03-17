import React, { Component } from 'react';
import PersonsTable from './personsTable';
import axios from 'axios';
import Modal from '../common//modal/modal';
import UserDetails from './details/userDetails';
import Search from '../common/search/search';
import Pagination from '../common/pagination/pagination';

class Persons extends Component {
  state = {
    users: [],
    filteredUsers: [],
    selectedUser: {},
    pagination: {},
    showModal: false
  };

  async componentDidMount() {
    this.getUsers();
  }

  async getUsers(startNumber) {
    const { data: response } = await axios.get(
      'https://api.pipedrive.com/v1/persons',
      {
        params: {
          user_id: 8484724,
          api_token: 'b57643096b0f4ed34ac5fd734fc73ea25a8e0043',
          limit: 4,
          start: startNumber > 0 ? startNumber : 0
        }
      }
    );
    const responseData = response.data;
    this.setState({
      users: responseData,
      filteredUsers: responseData,
      pagination: response.additional_data.pagination
    });
  }

  async delete(user_id) {
    const { data: response } = await axios.delete(
      'https://api.pipedrive.com/v1/persons/' + user_id,
      {
        params: {
          api_token: 'b57643096b0f4ed34ac5fd734fc73ea25a8e0043'
        }
      }
    );

    const users = this.state.filteredUsers.filter(
      user => user.id !== response.data.id
    );
    this.setState({
      users,
      filteredUsers: users
    });
  }

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

  toggleModal = user => {
    if (!this.state.showModal) {
      document.body.style.overflow = 'hidden';
    }
    this.setState({ selectedUser: user, showModal: !this.state.showModal });
  };

  handleDeletePerson = () => {
    const { id: user_id } = this.state.selectedUser;

    this.delete(user_id);
    this.toggleModal({});
  };

  handleSearch = e => {
    const query = e.target.value.toLowerCase();

    //clone users list
    let users = [...this.state.users];

    //filter users list
    users = users.filter(user => user.name.toLowerCase().includes(query));

    //update filtered list with the new users list
    this.setState({ filteredUsers: users });
  };

  handlePaginationNext = () => {
    const { next_start: start } = this.state.pagination;

    this.getUsers(start);
  };

  handlePaginationPrevious = () => {
    let { start } = this.state.pagination;

    start -= this.state.pagination.limit;
    this.getUsers(start);
  };

  render() {
    return (
      <div className="persons-container">
        <div>
          <h5 className="m-3">People's List</h5>
          <hr />
          <Search onChange={this.handleSearch} />
        </div>
        <div className="table-container">
          <PersonsTable
            users={this.state.filteredUsers}
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDragEnd={this.handleDragEnd}
            onClick={this.toggleModal}
          />
        </div>
        <Pagination
          paginationInfo={this.state.pagination}
          onClickNext={this.handlePaginationNext}
          onClickPrevious={this.handlePaginationPrevious}
        />
        {this.state.showModal ? (
          <Modal title="Person Information" closeModal={this.toggleModal}>
            <UserDetails
              selectedUser={this.state.selectedUser}
              closeModal={this.toggleModal}
              deletePerson={this.handleDeletePerson}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Persons;
