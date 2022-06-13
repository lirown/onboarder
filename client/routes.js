import config from './config';
// import { LAST_UPDATED_KEY } from './services/notepad';
import { signOut } from './services/authentication';
import db from './services/database';

/**
 * Update the navbar items by route
 */

function updateNavbar() {
  setTimeout(() => document.querySelector('nav-bar').requestUpdate(), 0);
}

/**
 * Route Config
 * @param {Route[]} route config
 */
export const routes = [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
    metadata: {
      title: config.appName,
      titleTemplate: null,
      description: config.appDescription
    },
    action: async () => {
      await import('./pages/page-home');
    }
  },
  {
    path: '/logout',
    redirect: '/',
    name: 'logout',
    metadata: {
      title: config.appName,
      titleTemplate: null,
      description: config.appDescription
    },
    action: async () => {
      await signOut();
      await db.clear();
      // localStorage.setItem(LAST_UPDATED_KEY, '');
      await import('./pages/page-home');
      updateNavbar();
    }
  },
  {
    path: '/reward',
    name: 'reward',
    component: 'page-reward',
    metadata: {
      title: 'Reward',
      description: null,
      image: null
    },
    action: async () => {
      await import('./pages/page-reward');
      updateNavbar();
    }
  },
  {
    path: '/overview',
    name: 'overview',
    component: 'page-overview',
    metadata: {
      title: 'Overview',
      description: null,
      image: null
    },
    action: async () => {
      await import('./pages/page-overview');
      updateNavbar();
    }
  },
  {
    path: '/guide',
    name: 'guide',
    component: 'page-guide',
    metadata: {
      title: 'Guide',
      description: null,
      image: null
    },
    action: async () => {
      await import('./pages/page-guide');
      updateNavbar();
    }
  },

  {
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    metadata: {
      title: 'Error',
      description: null,
      image: null
    },
    action: async () => {
      await import('./pages/page-not-found');
      updateNavbar();
    }
  },
  {
    path: '/404',
    name: '404',
    component: 'page-not-found',
    metadata: {
      title: 'Error',
      description: null,
      image: null
    },
    action: async () => {
      await import('./pages/page-not-found');
      updateNavbar();
    }
  }
];
