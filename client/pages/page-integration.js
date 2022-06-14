import { html } from '../components/base';
import { PageElement } from '../components';
import { redirect, urlForName } from '../services/router';

/**
 * guide Page - Dashboard to show status of the Onboarding.
 *
 * @element page-guide
 */
export class PageIntegration extends PageElement {
  /** @inheritdoc */

  constructor() {
    super();
    this.integrationPayload = '';
  }

  onChange({ target: { value } }) {
    this.integrationPayload = value;
  }

  render() {
    return html`
      <section class="not-found to-top">
        <h1>Paste your payload:</h1>
        <div class="integration">
          <textarea
            class="integration-payload"
            placeholder="{
    creditCard: '4580-XXXX-XX59-5425',
    address: 'Menachem Begin Road, 152',
    shippingMethod: 'Goldi premium'
}
"
            @change=${this.onChange}
            .value=${this.integrationPayload}
          ></textarea>
        </div>
        <div>
          <a href="${urlForName('guide')}">
            <button
              @click=${() => {
                window.localStorage.setItem(
                  'integrationPayload',
                  this.integrationPayload
                );
              }}
              class="generate-guide"
            >
              Generate Guide
            </button>
          </a>
        </div>
      </section>
    `;
  }
}

customElements.define('page-integration', PageIntegration);
