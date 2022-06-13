import { html } from '../components/base';
import { urlForName } from '../services/router';

/**
 * Creating a floating button for hiring
 * @return {HTMLElement}
 */
export function NavButton({
  /**
   * link to go on click
   * @type {String}
   */
  name = 'notepad',

  /**
   * image source of the button
   * @type {String}
   */
  params = {
    topic
  },

  /**
   * description of the hiring
   * @type {String}
   */
  label = 'My Growth Notepad'
}) {
  return html`
    <li class="type-notepad">
      <a href="${urlForName(name, params)}">${label}</a href="${urlForName(
    name,
    params
  )}">
      <pwa-install-button>
        <button>Install app</button>
      </pwa-install-button>
      <pwa-update-available>
        <button>Update app</button>
      </pwa-update-available>
    </li>
  `;
}
