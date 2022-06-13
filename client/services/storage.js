import { storageRef } from './firebase';
import { getUser } from './authentication';

/**
 * Save a content of a file by name
 *
 * @return {Promise<String>}
 */

export async function writeJSON(path, content) {
  return storageRef.child(path).putString(JSON.stringify(content));
}

/**
 * Get a state of user after login
 * @return {Promise<String>}
 */

export async function readJSON(path) {
  try {
    // Get the download URL
    const url = await storageRef.child(path).getDownloadURL();
    return await fetch(url, {
      method: 'GET' // *GET, POST, PUT, DELETE, etc.
    }).then((res) => res.json());
  } catch (err) {
    console.error(err, res);
    return {};
  }
}

/**
 * Get a metadata of uploaded file
 * @return {Promise<String>}
 */
export async function readMetadata(path) {
  return storageRef.child(path).getMetadata();
}
