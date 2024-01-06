import React from 'react';
import s from './style.module.css';

const ContactsItem = ({ name, phone, func, id }) => {
  return (
    <li>
      {name} {phone}
      <button className={s.btn} type="button" onClick={() => func(id)}>
        remove
      </button>
    </li>
  );
};

export default ContactsItem;
