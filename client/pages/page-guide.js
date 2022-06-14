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
      </section>
    `;
  }
}

customElements.define('page-guide', PageGuide);
