import React, { Component } from 'react';
import PersonsTable from './personsTable';
import axios from 'axios';
import Modal from '../common//modal/modal';
import UserDetails from './details/userDetails';

class Persons extends Component {
  state = {
    users: [],
    selectedUser: {},
    showPopup: false
  };

  async componentDidMount() {
    const { data: response } = await axios.get(
      'https://api.pipedrive.com/v1/persons',
      {
        params: {
          user_id: 8484724,
          api_token: 'b57643096b0f4ed34ac5fd734fc73ea25a8e0043',
          start: 0,
          limit: 4
        }
      }
    );

    this.setState({ users: response.data });
  }

  handleDragStart = (e, index) => {
    e.stopPropagation();
    this.draggedItem = this.state.users[index];
    e.dataTransfer.effectAllowed = 'move';
  };

  handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = this.state.users[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let users = this.state.users.filter(user => user !== this.draggedItem);

    // add the dragged item after the dragged over item
    users.splice(index, 0, this.draggedItem);

    this.setState({ users });
  };

  handleDragEnd = () => {
    this.draggedItem = null;
  };

  togglePopup = user => {
    this.setState({ selectedUser: user, showPopup: !this.state.showPopup });
  };

  render() {
    return (
      <div>
        <h5 className="m-3">People's List</h5>
        <hr />
        <div className="droppable">
          <PersonsTable
            users={this.state.users}
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDragEnd={this.handleDragEnd}
            onClick={this.togglePopup}
          />
        </div>
        {this.state.showPopup ? (
          <Modal title="Person Information" closePopup={this.togglePopup}>
            <UserDetails
              selectedUser={this.state.selectedUser}
              closePopup={this.togglePopup}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Persons;