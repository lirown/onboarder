import { html, LitElement, css } from './base';

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

/**
 * Authentication Modal (SignIn, SignUp, etc)
 * @return {HTMLElement}
 */
export class AuthModal extends LitElement {
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
      }

      ul,
      li {
        list-style-type: none;
      }

      ul#main-menu {
        display: flex;
        flex: 1;
        gap: 20px;
        align-self: stretch;
        justify-content: flex-end;
        height: 30px;

        position: absolute;
        top: 45px;
        left: 0;
        height: 30px;
        margin-right: 30px;
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
        ul#main-menu {
          position: relative;
          top: auto;
          left: auto;
        }

        fc-button[size='large'] {
          --fc-button-background-color: rgba(255, 255, 255, 0.3);
          --fc-button-item-color: white;
          font-size: 18px;
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

  /**
   * @returns {HTMLElement} modal
   */
  get modal() {
    return this.shadowRoot.getElementById('modal');
  }

  /** @inheritdoc */
  constructor() {
    super();
    this.formState = FORM_STATES.SIGNIN;
    this.emailValue = window.localStorage.getItem('emailForSignIn') || '';
    this.enterPressed = (event) => event.which === 13 || event.keyCode === 13;
    this.getWidth = () => (window.innerWidth < 500 ? '80%' : '205px');
  }

  /**
   * @returns {Object<email, password, name>} properties for authentication
   */
  getInputProps() {
    const root = this.shadowRoot;

    return {
      email: root.querySelector('#email').value,
      name: root.querySelector('#name').value,
      password: root.querySelector('#password').value
    };
  }

  isHidden(el) {
    return el.parentElement.hidden === true;
  }

  /**
   * fire auth request by the state of the form
   */
  async action() {
    try {
      const { password, email, name } = this.getInputProps();
      const { formState } = this;
      const { SIGNUP, SIGNIN } = FORM_STATES;

      this.error = '';

      if (formState === SIGNUP) {
        await signUp(email, password, name);
      } else if (formState === SIGNIN) {
        await signIn(email, password);
      } else {
        await forgotPassword(email);
      }

      await this.page.fetch();
      this.navbar.requestUpdate();
      this.modal.close();
    } catch (e) {
      this.error = e.message;
    }
  }

  get navbar() {
    return document.querySelector('nav-bar');
  }

  get page() {
    return document.querySelector('main').firstElementChild;
  }

  /**
   * toggle between signup and signin
   */
  toggleFormState() {
    this.error = '';
    this.formState =
      this.formState === FORM_STATES.SIGNIN
        ? FORM_STATES.SIGNUP
        : FORM_STATES.SIGNIN;
  }

  /** @inheritdoc */
  render() {
    const { FORGOT, FORGOT_POST_EMAIL, SIGNUP, SIGNIN } = FORM_STATES;
    const { enterPressed, formState, emailValue, getWidth } = this;

    return html`<fc-modal width="${getWidth()}" id="modal">
          <div>
            <img src="images/logodark.png"></img>
            <div
              ?hidden=${![SIGNUP].includes(formState)}
              class="field"
            >
              <label>Name</label>
              <fc-input id="name" label=" "></fc-input>
            </div>
            <div class="field">
              <label>Email</label>
              <fc-input
                id="email"
                label=" "
                value="${!formState === SIGNIN ? emailValue : ''}"
                @keypress="${(e) => (enterPressed(e) ? this.action() : '')}"
              ></fc-input>
            </div>
            <div
              ?hidden=${[FORGOT, FORGOT_POST_EMAIL].includes(formState)}
              class="field">
              <label>Password</label>
              <fc-input
                @keypress="${(e) => (enterPressed(e) ? this.action() : '')}"
                type="password" id="password" label=" " ></fc-input>
            </div>

            ${this.error ? html`<div id="error">${this.error}</div>` : ''}
            <span
                id="forgot"
              ?hidden=${[FORGOT, FORGOT_POST_EMAIL].includes(formState)}
              @click="${() => (this.formState = FORGOT)}"
              >Forgot Password?</span
            >
            <span
              id="reset-confirm"
              ?hidden=${![FORGOT_POST_EMAIL].includes(formState)}
              >A Link to log in has been sent to your mail, if such exist.</span
            >

            <div class="buttons">
              <fc-button
                @click="${() => this.action()}">
                ${
                  this.formState === FORM_STATES.SIGNUP
                    ? 'SIGN UP'
                    : this.formState === FORM_STATES.SIGNIN
                    ? 'SIGN IN'
                    : 'RECOVER USER'
                }
              </fc-button>

              <fc-button
                ?hidden="${![FORGOT_POST_EMAIL.includes(formState)]}"
                secondary
                @click="${() => this.toggleFormState()}">
                SIGN ${formState === SIGNIN ? 'UP' : 'IN'}
              </fc-button>
            </div>

            <div id="guest" @click=${() => this.modal.close()}>
                Continue as a guest</div>
          </div>
        </fc-modal>`;
  }
}

customElements.define('fc-auth-modal', AuthModal);
