import { LitElement, html, css, property } from 'lit-element';

export class StatusItem extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
      title: { type: String },
      date: { type: String }
    };
  }
  static get styles() {
    return css`
      :host {
        padding: 10px;
      }
    `;
  }

  render() {
    const { icon, title, date } = this;

    return html` <div
      style="display: flex; flex-direction: row; align-items: center; gap: 10px;"
    >
      <span
        style="height: 50px; width: 50px; border-radius: 50px; background: pink;"
      ></span>
      <div style="display: flex; flex-direction: column;">
        <span style="color: #e5e7ff">${title}</span>
        <span style="font-weight: 300; color: #e5e7ff; font-size: 12px;"
          >${date}</span
        >
      </div>
    </div>`;
  }
}
customElements.define('status-item', StatusItem);
