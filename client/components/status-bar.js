import { LitElement, html, css, property } from 'lit-element';
import { animate } from '@lit-labs/motion';

export class StatusBar extends LitElement {
  static get properties() {
    return {
      statusType: { type: String },
      title: { type: String },
      shifted: { type: Boolean }
    };
  }
  static get styles() {
    return css`
      .status-bar {
        transition: transform 0.3s;
        background-image: radial-gradient(
          circle,
          rgba(187, 187, 187, 1) 0%,
          rgba(92, 92, 92, 1) 100%
        );
        background-size: 300% 300%;
        background-position: -200% -200%;
        border-radius: 3px;
        width: 100%;
        height: 100%;
        background-size: 300% 300%;
        background-position: -200% -200%;
      }

      .shifted {
        transform: scale(1.2);
        cursor: pointer;
      }

      .success {
        background-image: radial-gradient(
          circle,
          rgba(90, 246, 75, 1) 0%,
          rgba(2, 176, 113, 1) 100%
        );
      }

      .partial {
        background-image: radial-gradient(
          circle,
          rgba(246, 238, 75, 1) 0%,
          rgba(246, 159, 65, 1) 100%
        );
      }
    `;
  }

  getClass() {
    const classes = ['status-bar'];

    this.statusType === 'success' && classes.push('success');
    this.statusType === 'partial' && classes.push('partial');
    this.shifted && classes.push('shifted');

    return classes.join(' ');
  }

  render() {
    return html`<div @click="${this.toggle}" class="${this.getClass()}"></div>`;
  }

  toggle() {
    this.shifted = !this.shifted;
  }
}
customElements.define('status-bar', StatusBar);
