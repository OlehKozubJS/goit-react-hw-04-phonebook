import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Alert } from './Alert';
import { nanoid } from 'nanoid';
import PhonebookStyles from './PhonebookCSS/Pnonebook.module.css';
import { useState, useEffect } from 'react';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      setName(data.name);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), ...data }]);
    setName('');
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const closeAlert = () => {
    setName('');
  };

  const searchQueryInput = value => {
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={PhonebookStyles.phonebook}>
      <h1 className={PhonebookStyles.phonebookHeader}>Phonebook</h1>
      <ContactForm submitFunction={addNewContact} />
      <Alert isInContacts={!!name} name={name} clickFunction={closeAlert} />
      <h2 className={PhonebookStyles.contactsHeader}>Contacts</h2>
      <Filter className="filterInput" changeFunction={searchQueryInput} />
      <ContactList
        className="contactList"
        items={filter ? filteredContacts() : contacts}
        clickFunction={deleteContact}
      />
    </div>
  );
};
