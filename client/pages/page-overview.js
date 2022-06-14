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

      <section class="status-container">
        <img src="images/animated-icon.svg" class="loader" />
        <div>
          ${[...Array(4).keys()].map((x, i) => {
            return html`
              <div
                class="card status-page"
                style="animation-delay: ${2500 + i * 100}ms;"
                }
              >
                <status-chart-box
                  .config=${this.currentData[i]}
                  title="${this.data[i].title}"
                  api="${this.data[i].api}"
                ></status-chart-box>

                <button>
                  <img class="error-icon" src="images/code-error.svg" />
                  Something isn't right
                </button>
              </div>
            `;
          })}
        </div>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
