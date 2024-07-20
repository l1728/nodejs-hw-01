import * as fs from 'node:fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const removeLastContact = async () => {
    const dbPath = path.resolve(PATH_DB);
    try {
        const rawData = await fs.readFile(dbPath, 'utf8');
        const contacts = JSON.parse(rawData);
        if (contacts.length > 0) {
            contacts.pop();

            await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2), 'utf8');
            console.log('Last contact has been removed');
        } else {
            console.log('No contacts to remove');
        }
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found:', dbPath);
        } else {
            console.error('Error removing last contact:', error);
        }
    }
};

removeLastContact();
