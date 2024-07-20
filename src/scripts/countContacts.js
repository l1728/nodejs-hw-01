import * as fs from 'node:fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const countContacts = async () => {
    const dbPath = path.resolve(PATH_DB);
    try {
        
        const rawData = await fs.readFile(dbPath, 'utf8');
        const contacts = JSON.parse(rawData);

        return contacts.length;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(('File not found:', dbPath));
            return 0;
        }
        console.error('Error reading contacts:', error);
        throw error;
    }
};

console.log(await countContacts());
