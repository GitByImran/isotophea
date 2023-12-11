import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: "656aecc9a4eca8b2c14f",
  url: "https://cloud.appwrite.io/v1",
  storageId: "656b2460304849c6c229",
  databaseId: "656b24f63d25f19add47",
  saveCollectionId: "6571ef2f60f69d6ae2cb",
  userCollectionId: "6571ee8d1d40522318ae",
  postCollectionId: "6571ef1e93da5fe443d7",
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
