import { LitElement, html, css, property } from 'lit-element';

export class StatusBar extends LitElement {
  static get properties() {
    return {
      statusType: { type: String },
      title: { type: String }
    };
  }
  static get styles() {
    return css`
      .status-bar {
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

      .status-bar:hover {
        transform: scale(1.2);
        transition: transform 0.3s;
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
    if (this.statusType === 'success') {
      return `status-bar success`;
    } else if (this.statusType === 'partial') {
      return `status-bar partial`;
    } else {
      return `status-bar`;
    }
  }

  render() {
    return html`<div class="${this.getClass()}"></div>`;
  }
}
customElements.define('status-bar', StatusBar);
