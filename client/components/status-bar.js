import { LitElement, html, css, property } from 'lit-element';

export class StatusBar extends LitElement {
  static get properties() {
    return {
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
    `;
  }

  render() {
    return html`<div class="status-bar"></div>`;
  }
}
customElements.define('status-bar', StatusBar);
