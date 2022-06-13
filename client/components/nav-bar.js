import { html, LitElement, css } from './base';
import { redirect, urlForName } from '../services/router';

import {
  signUp,
  forgotPassword,
  signIn,
  signOut,
  getUser
} from '../services/authentication';

const FORM_STATES = {
  FORGOT: 'FORGOT',
  FORGOT_POST_EMAIL: 'FORGOT_POST_EMAIL',
  SIGNIN: 'SIGNIN',
  SIGNUP: 'SIGNUP'
};

export class NavBar extends LitElement {
  /** @inheritdoc */
  static styles = [
    css`
      img {
        margin-bottom: 25px;
      }

      fc-button[size='large'] {
        --fc-button-background-color: rgba(255, 255, 255, 0.3);
        --fc-button-item-color: white;
        font-size: 14px;
        margin-right: 5px;
        margin-bottom: 5px;
      }

      fc-button[secondary] {
        --fc-button-background-color: transparent;
        --fc-button-item-color: white;
        --fc-button-min-height: 36px;
        --fc-button-padding: 20px;
        --fc-button-default-border-radius: 30px;
        font-weight: 600;
        font-size: 14px;
        line-height: 34px;
        text-decoration: none;
        border-radius: 66px;
        --fc-button-box-shadow: transparent;
        --fc-button-item-color: var(--fc-link);
      }
      .buttons {
        display: grid;
        place-items: center;
        margin: 20px 0px 10px;
        gap: 10px;
      }
      fc-input {
        --fc-input-height: 30px;
        --fc-input-background-color: white;
        border-radius: 30px;
        --fc-input-shadow: 0px 10px 20px var(--gray-2);
        margin: 5px 0 15px 0;
      }
      label {
        font-size: 16px;
        height-height: 18px;
        color: var(--gray-8);
      }
      #forgot {
        color: var(--fc-link);
        cursor: pointer;
      }
      #reset-confirm {
        font-size: 14px;
        color: var(--gray-8);
      }

      #guest {
        text-align: center;
        color: var(--gray-6);
        cursor: pointer;
      }

      #error {
        margin: 10px 0;
        text-transform: uppercase;
        color: red;
        font-size: 12px;
      }

      nav {
        display: flex;
        align-items: center;
        max-width: 245px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      ul,
      li {
        list-style-type: none;
      }

      ul#main-menu {
        display: flex;
        flex: 1 1 0%;
        justify-content: flex-start;
        position: absolute;
        top: 52px;
        left: -45px;
        height: 30px;
      }

      ul#main-menu li {
        position: relative;
        cursor: pointer;
      }

      ul#main-menu > li:first-child a {
        margin-left: 0;
      }

      li.type-drop a {
        position: relative;
        width: max-content;
        background: 0;
      }

      li.type-drop a:hover {
        color: #fff !important;
        background: #002255b3;
      }

      li.type-drop > a::after {
        position: relative;
        top: 1px;
        right: -3px;
        display: block;
        width: 16px;
        height: 16px;
        background: url(./images/arrow-down.svg);
        content: '';
      }
      #main-menu > li:hover #sub-menu {
        visibility: visible;
        opacity: 1;
      }
      nav li a {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        color: #fff;
        font-weight: 400;
        font-size: 16px;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        margin-right: 5px;
      }

      #sub-menu {
        position: absolute;
        left: 0;
        width: 230px;
        margin-top: 5px;
        overflow: hidden;
        background: rgb(0 34 85 / 70%);
        border-radius: 10px;
        visibility: hidden;
        opacity: 0;
        transition: all 0.15s ease-in;
        padding-inline-start: 0;
      }

      #sub-menu > li > a {
        display: flex;
        justify-content: start;
        width: 100%;
        margin: 0;
        padding: 5px 20px 8px;
        color: #bdd8ff;
        text-decoration: none;
        border-radius: 0;
      }

      #sub-menu > li {
        display: flex;
        justify-content: center;
        padding: 5px 0;
      }

      li.type-drop a[active] {
        color: #fff !important;
      }

      li.type-drop a:hover {
        color: #fff !important;
        background: #002255b3;
      }

      ul#main-menu > li.type-drop {
        /* display: none; */
      }

      @media (min-width: 992px) {
        nav {
          max-width: 100%;
        }

        ul#main-menu {
          position: relative;
          top: auto;
          left: auto;
          display: flex;
          flex: 1;
          gap: 20px;
          align-self: stretch;
          justify-content: flex-end;
          height: 30px;
        }

        fc-button[size='large'] {
          --fc-button-background-color: rgba(255, 255, 255, 0.3);
          --fc-button-item-color: white;
          font-size: 16px;
        }

        ul#main-menu > li.type-drop {
          display: block;
        }

        ul#main-menu {
          width: 495px;
        }

        ul#main-menu > li:not(.type-notepad) {
          display: block;
        }
        nav a {
          padding: 5px 5px 6px;
          font-size: 16px;
        }
      }
      [hidden] {
        display: none !important;
      }
      pwa-install-button > button,
      pwa-update-available > button {
        display: flex;
        align-items: center;
        margin-top: 3px;
        padding: 5px 20px;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50px;
        cursor: pointer;
      }

      [hidden] {
        display: none !important;
      }
    `
  ];

  /** @inheritdoc */
  static get properties() {
    return {
      label: { type: String },
      formState: { type: Boolean },
      height: { type: String },
      error: { type: String }
    };
  }

  /** @inheritdoc */
  constructor() {
    super();
    this.label = '';
  }

  /**
   * forward to the notepad route
   */
  openNotepad() {
    redirect('notepad', {
      topic: 'engineering-craftsmanship'
    });
  }

  /** @inheritdoc */
  render() {
    const user = getUser();
    const userRole = localStorage.getItem('user.role');

    return html`
      <nav>
          <a href="${urlForName('reward')}">
            <fc-button size="large"> Reward </fc-button>
          </a>
          <a href="${urlForName('overview')}">
            <fc-button size="large"> Overview </fc-button>
          </a>
          <a href="${urlForName('guide')}">
            <fc-button size="large"> Guide </fc-button>
          </a>
        ${
          !getUser()
            ? ''
            : html`
                <a
                  href="${urlForName('guide')}"
                >
                  <fc-button size="large"> Explore </fc-button>
                </a>
                <a href="${urlForName('logout')}">
                  <fc-button size="large"> Sign out </fc-button>
                </a>
              `
        }
      </a>
      </nav>`;
  }
}

customElements.define('nav-bar', NavBar);
