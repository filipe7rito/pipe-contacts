import {
  render,
  wait,
  fireEvent,
  getByLabelText
} from '@testing-library/react';
import React from 'react';
import Persons from './persons';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../services/contacts.js', () => {
  const response = {
    data: {
      success: true,
      data: [
        { id: 1, name: 'Judas' },
        { id: 2, name: 'Tony' }
      ],
      additional_data: {
        pagination: {
          start: 0,
          limit: 10,
          more_items_in_collection: false
        }
      }
    }
  };

  const findUser = string => {
    const filteredData = response.data.data.filter(user => {
      return user.name.toUpperCase().match(string.toUpperCase());
    });

    const filteredResponse = {
      data: {
        ...response.data,
        data: filteredData
      }
    };

    return Promise.resolve(filteredResponse);
  };

  return {
    getUsers: jest.fn(() => Promise.resolve(response)),
    findUser: findUser
  };
});

describe('<Persons>', () => {
  test('Render persons component', () => {
    const { asFragment, debug } = renderPersons();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a list of Persons', async () => {
    const { getByText } = renderPersons();
    await wait();
    expect(getByText(/judas/i)).toBeInTheDocument();
  });

  it('Should search by name , filtering the current list', async () => {
    const { queryByText, getByPlaceholderText, debug } = renderPersons();
    const spyOn = jest.spyOn(Persons.prototype, 'findUser');

    await wait();

    fireEvent.change(getByPlaceholderText('search user'), {
      target: {
        value: 'Judas'
      }
    });

    await wait();

    expect(queryByText('Tony')).not.toBeInTheDocument();
    expect(spyOn).toHaveBeenCalledWith('judas');
  });

  function renderPersons() {
    return render(<Persons></Persons>);
  }
});
