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
          gap: 7px;
          flex-direction: column;
          padding: 10px;
        }

        .status-chart {
          display: flex;
          justify-content: center;
          gap: 5px;
          border-radius: 8px;
        }

        .status-bar {
          background-color: #1ee164;
          width: 2.5%;
          height: 80px;
          border-radius: 300px;
        }

        .actions button {
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          background: #ffe9e9;
          color: #db0000;
          text-transform: uppercase;
        }
      </style>

      <section>
        <div>
          <div class="title">Decisions API:</div>
          <div class="card status-page">
            <div class="status-chart">
              ${Array.from(Array(30).keys()).map(
                (x) => html`<div class="status-bar"></div>`
              )}
            </div>

            <div class="actions">
              <button>5 blocking issues detected</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
