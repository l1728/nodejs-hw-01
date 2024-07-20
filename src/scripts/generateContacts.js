import * as fs from 'node:fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
    try {
        const dbPath = path.resolve(PATH_DB);
        let contacts = [];
    
        try {
            const rawData = await fs.readFile(dbPath, 'utf-8');
            contacts = JSON.parse(rawData);

        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        for (let i = 0; i < number; i++) {
            contacts.push(createFakeContact());
        }
        await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2), 'utf8');
        console.log(`${number} contacts have been generated and added to ${dbPath}`);
    } catch (error) {
        console.error('Error generating contacts:', error);
    }
    };

generateContacts(5);
