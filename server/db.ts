// Database functions disabled - using file storage instead
// All product operations are handled by fileStorage.ts

export async function getDb() {
  return null;
}

export async function upsertUser() {
  console.warn("[Database] User operations disabled - using file storage");
}

export async function getUserByOpenId() {
  return undefined;
}
