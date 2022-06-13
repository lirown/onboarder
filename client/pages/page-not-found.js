import { html } from '../components/base';
import { PageElement } from '../components';
import { setMetaTag } from '../services/html-meta-manager';

/**
 * Not Found Page - 404 when trying to access none existing route.
 *
 * @element page-not-found
 */
export class PageNotFound extends PageElement {
  /** @inheritdoc */
  render() {
    return html`
      <section class="not-found">
        <h1>404</h1>
        <h2>Oops!</h2>
        <h3>We can't seem to find the page you're looking for...</h3>
      </section>
    `;
  }

  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();

    setMetaTag('name', 'render:status_code', '404');
  }

  /** @inheritdoc */
  disconnectedCallback() {
    removeMetaTag('name', 'render:status_code');

    super.disconnectedCallback();
  }
}

customElements.define('page-not-found', PageNotFound);
