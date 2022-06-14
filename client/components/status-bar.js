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
        background-color: gray;
        border-radius: 3px;
        width: 100%;
        height: 100%;
      }

      .status-bar:hover {
        transform: scale(1.2);
        transition: transform 0.3s;
        cursor: pointer;
      }

      .success {
        background-color: #8bed8b;
      }

      .partial {
        background-color: #f7ed7af5;
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
