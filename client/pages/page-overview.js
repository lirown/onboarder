import { html } from '../components/base';
import { PageElement } from '../components';
import { getGeneratedData } from './../helpers.js/mockData';
import { redirect } from '../services/router';

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
  }

  updateStep(direction) {
    if (this.dayCounter < 30) {
      this.dayCounter += direction;
    }
    this.currentData[0] = this.getCurrentDay(0);
    this.currentData[1] = this.getCurrentDay(1);
    this.currentData[2] = this.getCurrentDay(2);
    this.currentData[3] = this.getCurrentDay(3);
    this.requestUpdate();
  }

  getCurrentDay(index) {
    const emptyValues = Array.from(
      Array(30 - this.dayCounter).keys()
    ).map((x) => ({ type: null }));
    const values = this.data[index].status.map((x) => Object.assign({}, x));
    values.status = emptyValues.concat(values.splice(0, this.dayCounter));
    return values;
  }

  getEmptyValues() {
    return {
      status: Array.from(Array(30).keys()).map((x) => ({ type: null }))
    };
  }

  toggleTimeline(event) {
    this.timelineOpen = !this.timelineOpen;
    this.requestUpdate();
  }

  onStartClick() {
    this.clickedOnStart = window.localStorage.getItem('clickedOnStart');
    if (this.clickedOnStart === 'true') {
      return redirect('guide');
    }
    return redirect('integration');
  }

  render() {
    return html`
      <style>
        .status-page {
          margin: 40px 0px;
          display: flex;
          gap: 7px;
          flex-direction: column;
          padding: 10px;
        }
      </style>

      <section class="status-container">
        <img src="images/animated-icon.svg" class="loader" />
        <div class="status-page-wrapper">
          ${[...Array(6).keys()].map((x, i) => {
            return html`
              <div
                class="card status-page"
                style="animation-delay: ${2500 + i * 100}ms;"
                }
              >
                <status-chart-box
                  .config=${this.dayCounter === 0
                    ? this.getEmptyValues()
                    : this.currentData[i]}
                  title="${this.data[i].title}"
                  api="${this.data[i].api}"
                  @bar-toggle="${this.toggleTimeline}"
                ></status-chart-box>

                <button @click="${this.onStartClick}">
                  <div class="error-icon">!</div>
                  Go to the guide!
                </button>
              </div>
            `;
          })}
          <span class="navigation" style="animation-delay: 2500ms;">
            <button
              style="width:100px"
              class="right"
              @click="${() => this.updateStep(1)}"
            >
              <div class="error-icon">></div>
              Next
            </button>
            <button
              style="width:100px"
              class="right"
              @click="${() => this.updateStep(-1)}"
            >
              <div class="error-icon"><</div>
              Previous
            </button>
          </span>
        </div>
        <status-timeline ?open="${this.timelineOpen}"></status-timeline>
      </section>
    `;
  }
}

customElements.define('page-overview', PageOverview);
