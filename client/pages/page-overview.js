import { html } from '../components/base';
import { PageElement } from '../components';
import { getGeneratedData } from './../helpers.js/mockData';

/**
 * Overview Page - Dashboard to show status of the Onboarding.
 *
 * @element page-overview
 */
export class PageOverview extends PageElement {
  /** @inheritdoc */

  constructor() {
    super();
    this.data = getGeneratedData();
    this.currentData = [];

    this.dayCounter = 0;
    setInterval(() => {
      if (this.dayCounter < 30) {
        this.dayCounter++;
      }
      this.currentData[0] = this.getCurrentDay(0);
      this.currentData[1] = this.getCurrentDay(1);
      this.currentData[2] = this.getCurrentDay(2);
      this.currentData[3] = this.getCurrentDay(3);
      this.requestUpdate();
    }, 1000);
  }

  getCurrentDay(index) {
    const emptyValues = Array.from(
      Array(30 - this.dayCounter).keys()
    ).map((x) => ({ type: null }));
    const values = this.data[index].status.map((x) => Object.assign({}, x));
    values.status = emptyValues.concat(values.splice(0, this.dayCounter));
    return values;
  }

  render() {
    debugger;
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
            <status-chart-box
              .config=${this.currentData[0]}
              title="${this.data[0].title}"
              api="${this.data[0].api}"
            ></status-chart-box>
          </div>
          <div class="card status-page">
            <status-chart-box
              .config=${this.currentData[1]}
              title="${this.data[1].title}"
              api="${this.data[1].api}"
            ></status-chart-box>
          </div>
          <div class="card status-page">
            <status-chart-box
              .config=${this.currentData[2]}
              title="${this.data[2].title}"
              api="${this.data[2].api}"
            ></status-chart-box>
          </div>
          <div class="card status-page">
            <status-chart-box
              .config=${this.currentData[3]}
              title="${this.data[3].title}"
              api="${this.data[3].api}"
            ></status-chart-box>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
