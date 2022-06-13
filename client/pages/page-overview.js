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
          width: 500px;
          padding: 10px;
          border-radius: 8px;
        }

        .status-bar {
          background-color: #1ee164;
          width: 2.5%;
          height: 80px;
          border-radius: 300%;
        }
      </style>

      <section>
        <div>
          <div class="title">API:</div>
          <div class="card status-page">
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
