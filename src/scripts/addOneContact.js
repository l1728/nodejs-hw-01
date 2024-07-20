import * as fs from 'node:fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
    try {
        const dbPath = path.resolve(PATH_DB);
        let contacts = [];
        try {
            const rawData = await fs.readFile(dbPath, 'utf8');
            contacts = JSON.parse(rawData);
        } catch (error) {
            if (error.code !== 'ENOENT') {
            throw error;
        }
        }
        contacts.push(createFakeContact());
        await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2), 'utf8');
        console.log(`One contact has been generated and added to $(dbPath)`);
    } catch (error) {
        console.error('Error adding one contact:', error);
    }
};

addOneContact();
