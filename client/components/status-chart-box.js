import { LitElement, html, css, property } from 'lit-element';

export class StatusChartBox extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      api: { type: String },
      config: { type: Object }
    };
  }
  static get styles() {
    return css`
      :host {
        width: 100%;
        display: block;
      }
      .status-page {
        margin: 5px 0px;
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .status-chart {
        display: flex;
        justify-content: space-between;
        background-color: var(--fc-secondary-light);
        width: 100%;
        padding: 10px;
        border-radius: 8px;
      }

      status-bar {
        background-color: gray;
        width: 2.5%;
        height: 70px;
        border-radius: 3px;
      }

      /* .chart-wrapper {
        padding: 20px;
      } */

      .title {
        font-size: 16px;
        color: #555;
      }
    `;
  }

  render() {
    return html`
      <div class="title">${this.title}</div>
      <div class="status-page">
        <div class="status-chart">
          ${this.config.status.map(({ type }) => {
            return html`<status-bar statusType=${type}></status-bar>`;
          })}
        </div>
      </div>
    `;
  }
}
customElements.define('status-chart-box', StatusChartBox);
