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
      </style>

      <section>
        <div>
          <div class="card status-page">
            <status-chart-box title="JS Snippet"></status-chart-box>
            <div class="actions">
              <button>5 blocking issues detected</button>
            </div>
          </div>
          <div class="card status-page">
            <status-chart-box title="Validation API"></status-chart-box>
          </div>
          <div class="card status-page">
            <status-chart-box title="Order Status API"></status-chart-box>
         </div>
          <div class="card status-page">
            <status-chart-box title="Claims API"></status-chart-box>
          </div>
         <div class="card status-page">
            <status-chart-box title="Historical Data"></status-chart-box>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
