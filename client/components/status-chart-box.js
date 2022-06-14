import { LitElement, html, css, property } from 'lit-element';
import { getGeneratedData } from '../helpers.js/mockData';

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
        background-color: #fafafa;
        width: 100%;
        padding: 10px;
        border-radius: 8px;
      }

      .status-bar {
        background-color: gray;
        width: 2.5%;
        height: 70px;
        border-radius: 3px;
      }

      /* .chart-wrapper {
        padding: 20px;
      } */

      .status-bar:hover {
        transform: scale(1.2);
        transition: transform 0.3s;
        cursor: pointer;
      }

      .title {
        font-size: 16px;
        color: #555;
      }

      .success {
        background-color: #5ff25f;
      }

      .partial {
        background-color: #f0f12f;
      }
    `;
  }

  render() {
    return html`
      <div class="title">${this.title}</div>
      <div class="title">${this.api}</div>
      <div class="status-page">
        <div class="status-chart">
          ${this.config.status.map(({ type }) => {
            if (type === 'success') {
              return html`<div class="status-bar success"></div>`;
            } else if (type === 'partial') {
              return html`<div class="status-bar partial"></div>`;
            } else {
              return html`<div class="status-bar "></div>`;
            }
          })}
        </div>
      </div>
    `;
  }
}
customElements.define('status-chart-box', StatusChartBox);
