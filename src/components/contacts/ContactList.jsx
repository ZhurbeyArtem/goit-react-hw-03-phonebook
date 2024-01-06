import React from 'react';
import ContactsItem from './ContactsItem';
import s from './style.module.css';

const ContactList = ({ users, removeUser }) => {
  return (
    <ul className={s.list}>
      {users.map(e => {
        return (
          <ContactsItem
            key={e.id}
            id={e.id}
            name={e.name}
            phone={e.number}
            func={removeUser}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
