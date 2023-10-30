import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('653ff0db331dd5037cbf');

export const account = new Account(client);
export { ID } from 'appwrite';
