import { html, css } from '../components/base';
import {
  PageElement,
} from '../components';

/**
 * Home Page when opening the app.
 * <!-- Author: Liron Goldenberg <lgoldenberg@forter.com> -->
 *
 * @element page-home
 */
export class PageHome extends PageElement {

  /** @inheritdoc */
  render() {
    return html` <section class="main-hero">
        <div class="container">
          <div class="hero-inner">
            <h1>
              Improve your craftsmanship<br />
              as a Software Engineer
            </h1>
            <h2>
              We'll share with you ideas, concepts, frameworks and resources
              that can help you improve your skills, expand your knowledge and
              make bigger impact.
            </h2>
            <div class="bottom-data">
              <fc-button
                size="large"
                >I'm Ready! Show Me</fc-button
              >
              <p>all free, no emails, no BS. We're Engineers...</p>
            </div>
          </div>
        </div>
      </section>`;
  }
}

customElements.define('page-home', PageHome);
