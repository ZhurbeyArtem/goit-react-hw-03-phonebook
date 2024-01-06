import ContactsForm from './form/ContactsForm';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import Filter from './filters/Filter';
import ContactList from './contacts/ContactList';
import s from 'index.module.css';

export class App extends Component {
  state = {
    contacts:
      JSON.parse(localStorage.getItem('contacts')).length > 0
        ? JSON.parse(localStorage.getItem('contacts'))
        : [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
          ],
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

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  removeUser = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
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
