import { LitElement, html, css } from './components/base';
import { User } from './components/user';
import {
  ShareSection,
  MadeWithLove,
  HiringButton,
  Logo,
  NavButton,
  NavDropdownItem
} from './components';

import { attachRouter } from './services/router';
import '@forter/checkbox';
import '@forter/button';
import '@forter/radio';
import '@forter/tooltip';
import '@forter/input';

import './components/nav-bar.js';
import './components/elastic-tab.js';
import './components/modal.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

/**
 * App wrapper that contains the basic layout and router
 *
 * @element app-index
 */
export class App extends LitElement {
  /** @inheritdoc */
  render() {
    const { pathname } = location;
    return html` <header class="card">
        <a class="logo">
          ${Logo()}
          Forter 
          <b> Onboarding </b>
        </a>
        <a class="user">
          Liron G
          ${User()}
        </a>
      </header>

      <!-- The main content is added / removed dynamically by the router -->
      <main role="main"></main>

      <footer>
        <a hidden id="link"><a>
      </footer>`;
  }

  /** @inheritdoc */
  createRenderRoot() {
    return this;
  }

  /**
   * scroll check for sticky header
   */
  spyScroll() {
    const myID = document.body;
    const y = window.scrollY;
    if (y >= 242) {
      myID.classList.add('scrolled');
    } else {
      myID.classList.remove('scrolled');
    }
  }

  /** @inheritdoc */
  async firstUpdated() {
    attachRouter(this.querySelector('main'));
    /*    const that = this;
    window.addEventListener(
      'scroll',
      function () {
        that.spyScroll();
      },
      false
    ); */
  }
}

customElements.define('app-index', App);
