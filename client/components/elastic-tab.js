import { html, LitElement, css } from './base';

export class ElasticTabs extends LitElement {
  /** @inheritdoc */
  static styles = [
    css`
      .tabs span.active {
        color: rgba(255, 255, 255, 1);
      }

      .tabs {
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        letter-spacing: 0.3px;
        font-size: 18px;
        padding: 0px;
        list-style: none;
        display: inline-block;
        position: relative;
      }

      .tabs span {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.5);
        padding: 6px 8px 6px 16px;
        margin: 0;
        display: inline-block;
        position: relative;
        z-index: 1;
        transition: 0.45s;
        cursor: pointer;
      }

      .tabs span:first-of-type {
        border-radius: 32px 0 0 32px;
      }

      .tabs span:last-of-type {
        border-radius: 0 32px 32px 0;
      }

      .tabs .selector {
        height: 100%;
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
        margin: 0 0 0 5px;
        border-radius: 50px;
        transition-duration: 0.45s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        background: rgba(255, 255, 255, 0.2);
        opacity: 0;
        animation: fadein 1.5s 0.3s forwards;
      }

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .count {
        color: #05d89475 !important;
        pointer-events: none;
      }

      .active .count {
        color: var(--fc-secondary) !important;
      }
    `
  ];

  /** @inheritdoc */
  static get properties() {
    return {
      tabs: { type: Array },
      activeElementName: { type: String },
      left: { type: String },
      width: { type: String },
      height: { type: String },
      top: { type: String }
    };
  }

  /** @inheritdoc */
  constructor() {
    super();
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
  }

  /** @inheritdoc */
  updated(changedProperties) {
    changedProperties.forEach((key, value) => {
      const allowedUpdates = ['activeElementName'];
      if (allowedUpdates.includes(value)) {
        this.tabClick(this.activeElementName);
      }
    });
  }

  /**
   * dispatch change event to slide animated
   */
  tabClick(activeElementName) {
    this.activeElementName = activeElementName;
    const selectedTab = this.shadowRoot.querySelector(
      `[name='${activeElementName}']`
    );
    this.width = selectedTab.clientWidth;
    this.left = selectedTab.offsetLeft - 5;
    this.top = selectedTab.offsetTop;
    this.height = selectedTab.clientHeight;

    const item = this.tabs.find((tab) => tab.name === activeElementName);

    this.dispatchEvent(new CustomEvent('change', { detail: item }));
  }

  /** @inheritdoc */
  render() {
    return html`<nav class="tabs">
      <div
        style="transform: translateX(${this.left}px); width: ${this
          .width}px; top: ${this.top}px; height: ${this.height}px;"
        class="selector"
      ></div>
      ${(this.tabs || []).map(
        (item) => html`
          <span
            name="${item.name}"
            elastictab
            class="${this.activeElementName === item.name ? 'active' : ''}"
            @click=${(e) => this.tabClick(item.name, e)}
          >
            ${item.name}
            <span class="count">${item.count}</span>
          </span>
        `
      )}
    </nav>`;
  }
}

customElements.define('elastic-tabs', ElasticTabs);
