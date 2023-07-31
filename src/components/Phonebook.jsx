import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Alert } from './Alert';
import { nanoid } from 'nanoid';
import PhonebookStyles from './PhonebookCSS/Pnonebook.module.css';
import { useState, useEffect } from 'react';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isInContacts, setIsInContacts] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      setIsInContacts(true);
      setName(data.name);
      return;
    }
    setContacts(...contacts, { id: nanoid(), ...data });
    closeAlert();
  };

  const closeAlert = () => {
    setIsInContacts(false);
    setName('');
  };

  const findContactsByName = () => {
    const userSearchData = this.state.filter;
    const searchResults = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(userSearchData.toLowerCase())
    );
    return searchResults;
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  return (
    <div className={PhonebookStyles.phonebook}>
      <h1 className={PhonebookStyles.phonebookHeader}>Phonebook</h1>
      <ContactForm submitFunction={addNewContact} />
      <Alert
        isInContacts={isInContacts}
        name={name}
        clickFunction={closeAlert}
      />
      <h2 className={PhonebookStyles.contactsHeader}>Contacts</h2>
      <Filter
        className="filterInput"
        changeFunction={value => setFilter(value)}
      />
      <ContactList
        className="contactList"
        items={!filter ? contacts : findContactsByName()}
        clickFunction={id =>
          setContacts(contacts.filter(contact => contact.id !== id))
        }
      />
    </div>
  );
};
