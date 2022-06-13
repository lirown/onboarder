import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import config from '../config';

/**
 * Firebase app intialization.
 */
export const app = firebase.initializeApp(config.firebase);

/**
 * Get a reference to the storage service, which is used to create references in your storage bucket
 */
export const storage = firebase.storage();

/**
 * Create a storage reference from our storage service
 */
export const storageRef = storage.ref();
