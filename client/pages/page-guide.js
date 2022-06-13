import { html } from '../components/base';
import { PageElement } from '../components';

/**
 * guide Page - Dashboard to show status of the Onboarding.
 *
 * @element page-guide
 */
export class PageGuide extends PageElement {
  /** @inheritdoc */
  render() {
    return html`
      <section class="not-found">
        <h1>Guide</h1>
        <h2>Oops!</h2>
        <h3>We can't seem to find the page you're looking for...</h3>
      </section>
    `;
  }
}

customElements.define('page-guide', PageGuide);
