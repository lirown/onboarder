import { html } from '../components/base';
import { PageElement } from '../components';
import { redirect } from '../services/router';

/**
 * Reward Page - Dashboard to show status of the Onboarding.
 *
 * @element page-reward
 */
export class PageReward extends PageElement {
  constructor() {
    super();
    this.clickedOnStart = window.localStorage.getItem('clickedOnStart');
  }

  onStartClick() {
    window.localStorage.setItem('clickedOnStart', 'true');
    return redirect('integration');
  }
  /** @inheritdoc */
  render() {
    return html`
      <section class="container">
        <div class="score-container">
          <div class="art">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 200 200"
              style="enable-background:new 0 0 200 200;"
              xml:space="preserve"
            >
              <style type="text/css">
                .st0 {
                  fill-rule: evenodd;
                  clip-rule: evenodd;
                  fill: none;
                  stroke: #206aff;
                  stroke-width: 9.3158;
                  stroke-linecap: round;
                  stroke-miterlimit: 10;
                }
                .st1 {
                  fill-rule: evenodd;
                  clip-rule: evenodd;
                  fill: none;
                  stroke: #206aff;
                  stroke-width: 7;
                  stroke-linecap: round;
                  stroke-miterlimit: 10;
                }
                .path {
                  stroke-dasharray: 100;
                  stroke-dashoffset: 171;
                  animation: dash 2s cubic-bezier(0.48, 0.04, 0.46, 0.97)
                    infinite alternate;
                  filter: hue-rotate(10deg);
                }

                @keyframes dash {
                  to {
                    stroke-dasharray: 38;
                    filter: hue-rotate(0deg);
                  }
                }
              </style>
              <path
                class="path st0"
                d="M67.4,68.6c0,0,42-16.6,58.8,10.7c15,24.4,4.1,52.5-9.6,66.5"
              />
              <path
                class="path st1"
                d="M74.4,151.4c0,0,25.5-8.5,32.6-26.5c6.3-16,8-39.2-19.3-42.5c-25.1-3.1-39.6,15.2-39.6,15.2"
              />
              <path
                class="path st1"
                d="M80,130.3c0,0-17.5,12.6-27.5,1.8c-11.8-12.8,20.4-40.7,33.4-29.3C98.3,113.8,80,130.3,80,130.3z"
              />
              <path class="path st0" d="M96.5,48.4c0,0,49.6-8.1,54.4,39.7" />
            </svg>

            <img src="images/rewards.svg" alt="" srcset="" />
          </div>
          <section class="copy">
            <h3 class="title">
              ${this.clickedOnStart !== 'true'
                ? 'Welcome'
                : `You're almost there!`}
            </h3>
            <p class="description">
              ${this.clickedOnStart !== 'true'
                ? 'Finish the Forter integration in 30 days to win a reward!'
                : 'Keep adding data points in order to achieve superior fraud detection.*'}
            </p>
            <button @click=${this.onStartClick} class="action-button">
              ${this.clickedOnStart === 'true'
                ? 'Call To Action'
                : `Let's start`}
            </button>
          </section>
        </div>

        <div class="reward-container">
          <div class="highlighted-text">
            Finish the integration and get this reward
          </div>
          <img src="images/shirt.png" width="250" alt="" srcset="" />
        </div>
      </section>
    `;
  }
}

customElements.define('page-reward', PageReward);
