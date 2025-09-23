import { Client, Account, Databases, Storage, ID, Permission, Role } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68d1189d0032c9ffb007');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const AppwriteConfig = {
    databaseId: '68d123fa001ab3e4ced6',
    schoolCollectionId: 'schools',
    playersCollectionId: 'players',
    adminProfilePhotosBucketId: '68d1275000117b8f8996',
    schoolBadgesBucketId: '68d12737002172230dc3',
    playerPhotosBucketId: '68d1276100219f5b40a1',
};

export { ID, Permission, Role };
