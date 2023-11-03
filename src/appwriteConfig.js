import { Client, Account, Databases } from 'appwrite';

export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_WATCHLIST_COLLECTION_ID;

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_APPWRITE_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query } from 'appwrite';
