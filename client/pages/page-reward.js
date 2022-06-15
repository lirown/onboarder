import { html } from '../components/base';
import { PageElement } from '../components';
import { redirect } from '../services/router';
import confetti from 'canvas-confetti';

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

  firstUpdated() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 120, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      );
    }, 250);
  }
  /** @inheritdoc */
  render() {
    return html`
      <section class="container">
        <div class="score-container">
          <div class="art" style="width:350px;">
            <img
              src="images/shirt.png"
              style="margin-left:20px"
              width="250"
              alt=""
              srcset=""
              class="circle"
            />
          </div>
          <section class="copy">
            <h3 class="title">You've made it!</h3>
            <p class="description">
              Finished the Forter integration congragulation!
            </p>
            <button @click=${this.onStartClick} class="action-button">
              Claim your reward
            </button>
          </section>
        </div>
      </section>
    `;
  }
}

customElements.define('page-reward', PageReward);
