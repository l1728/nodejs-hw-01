import * as fs from 'node:fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const removeAllContacts = async () => {
    const dbPath = path.join(PATH_DB);
    try {
        await fs.writeFile(dbPath, JSON.stringify([], null, 2), 'utf8');
        console.log(`All contacts have been removed from ${dbPath}`);
    } catch (error) {
        console.error(('Error removing contacts:', error));
    }
};

removeAllContacts();
