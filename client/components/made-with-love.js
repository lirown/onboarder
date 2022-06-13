import { html } from '../components/base';

/**
 * Adding section to white mark by who this was made
 * @return {HTMLElement}
 */

export function MadeWithLove() {
  return html`
    <div>
      Made with ❤️ by
      <a target="_blank" href="https://forter.dev"> Forter Engineering </a>
    </div>
  `;
}
