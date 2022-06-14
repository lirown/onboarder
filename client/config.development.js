const STRING = 'string';
const ENUM = 'enum';
const NUMBER = 'number';
const DATE = 'date';

/**
 * define the firebase apo name
 */
const firebaseAppName = 'onborader-ae8b1';

/**
 * config file
 */
export default {
  branch: 'roee-static-design',
  environment: 'development',
  appName: 'Onborading Engineering',
  appDescription: 'Improve your craftsmanship as a Software Engineer',
  firebase: {
    apiKey: 'AIzaSyBkIN_bAvP2kXSlxewskt_y0DnSAOapxWI',
    authDomain: `${firebaseAppName}.firebaseapp.com`,
    databaseURL: `https://${firebaseAppName}.firebaseio.com`,
    projectId: firebaseAppName,
    storageBucket: `${firebaseAppName}.appspot.com`,
    messagingSenderId: '197637216871'
  },
  database: {
    name: 'Onborading',
    version: 1,
    schema: {
      user: {
        role: { type: STRING },
        updatedAt: { type: NUMBER, indexed: true }
      },
      notepad: {
        key: { type: STRING, key: true },
        section: {
          type: ENUM,
          values: ['Responsibilities', 'Resources', 'Examples', 'Anti-Patterns']
        },
        status: { type: ENUM, values: ['added', 'done'] },
        topic: { type: STRING },
        updatedAt: { type: NUMBER, indexed: true }
      }
    }
  }
};
