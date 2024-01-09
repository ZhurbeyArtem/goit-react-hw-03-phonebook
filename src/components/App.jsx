import ContactsForm from './form/ContactsForm';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import Filter from './filters/Filter';
import ContactList from './contacts/ContactList';
import s from 'index.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addUser = (name, phone) => {
    const isExist = this.state.contacts.filter(
      e =>
        e.name.toLowerCase() === name.toLowerCase() ||
        e.number.toLowerCase() === phone.toLowerCase()
    );
    if (isExist.length > 0) {
      Notify.failure(`${name} or ${phone} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(), name, number: phone };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  removeUser = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = val => {
    this.setState({ filter: val });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className={s.app}>
        <h1>Phonebook</h1>
        <ContactsForm addUser={this.addUser} />

        <h2>Contacts</h2>
        <Filter filterFunc={this.setFilter} />
        <ContactList
          users={this.filteredContacts()}
          removeUser={this.removeUser}
        />
      </div>
    );
  }
}
