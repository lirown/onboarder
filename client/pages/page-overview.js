import { html } from '../components/base';
import { PageElement } from '../components';

/**
 * Overview Page - Dashboard to show status of the Onboarding.
 *
 * @element page-overview
 */
export class PageOverview extends PageElement {
  /** @inheritdoc */
  render() {
    return html`
      <style>
        .status-page {
          margin: 20px 0px;
          display: flex;
          justify-content: center;
        }

        .status-chart {
          display: flex;
          justify-content: space-between;
          background-color: #1f2e45;
          width: 500px;
          padding: 10px;
          border-radius: 8px;
        }

        .status-bar {
          background-color: #00a6ff;
          width: 2.5%;
          height: 80px;
          border-radius: 3px;
        }

        .status-bar:hover {
          transform: scale(1.2);
          transition: transform 0.3s;
          cursor: pointer;
        }
      </style>

      <section>
        <div>
          <div class="title">API:</div>
          <div class="status-page">
            <div class="status-chart">
              ${Array.from(Array(30).keys()).map(
                (x) => html`<div class="status-bar"></div>`
              )}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
