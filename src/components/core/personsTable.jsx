import React from 'react';
import UserCard from '../core/user/userCard';

const PersonTable = props => {
  const { users } = props;

  return (
    <table className='table table-borderless'>
      <thead />
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.id}
            draggable={true}
            onDragOver={e => props.onDragOver(e, index)}
            onDragStart={e => props.onDragStart(e, index)}
            onDragEnd={props.onDragEnd}
          >
            <td style={{ padding: '5px 10px 5px 10px' }}>
              <UserCard
                user={user}
                onClick={() => props.onClick(props.users[index])}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonTable;
