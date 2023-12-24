const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");
const updateContacts = (contacts) =>
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) return null;
    const [result] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return result;
};

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        ...data,
        id: nanoid(),
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContact = async (id, data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    contacts[idx] = { id, ...data };
    await updateContacts(contacts);
    return contacts[idx];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
