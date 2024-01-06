import React from 'react';
import s from './style.module.css';

const Filter = ({ filterFunc }) => {
  return (
    <div className={s.container}>
      <label className={s.formLabel}>
        Find contact by name
        <input type="text" onInput={e => filterFunc(e.target.value)} />
      </label>
    </div>
  );
};

export default Filter;
