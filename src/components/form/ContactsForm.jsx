import React, { Component } from 'react';
import s from './style.module.css';

class ContactsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, phone } = this.state;
    this.props.addUser(name, phone);
    this.setState({ name: '', phone: '' });
    e.target.reset();
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <label className={s.formLabel}>
            Name
            <input
              type="text"
              required
              onInput={this.handleNameChange}
              value={this.state.name}
            />
          </label>
          <label className={s.formLabel}>
            Number
            <input
              type="tel"
              required
              onInput={this.handlePhoneChange}
              value={this.state.phone}
            />
          </label>

          <button type="submit" className={s.formBtn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactsForm;
