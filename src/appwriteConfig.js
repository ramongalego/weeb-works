import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_APPWRITE_KEY);

export const account = new Account(client);
export { ID } from 'appwrite';
