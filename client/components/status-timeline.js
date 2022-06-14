import { LitElement, html, css, property } from 'lit-element';

export class StatusTimeline extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      state: { type: Object }
    };
  }
  static get styles() {
    return css`
      :host {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 100vh;
        left: 0;
        z-index: 2;
      }

      .timeline-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        background: var(--fc-light);
        border-top: 2px solid var(--fc-secondary-light);
        color: black;
        height: 70%;
        width: 100%;
        transform: translateY(0);
        transition: transform 0.7s ease-in-out;
      }

      :host([open]) .timeline-card {
        transform: translateY(-100%);
      }

      .button {
        width: 100px;
        height: 10px;
        background: gray;
      }
    `;
  }

  close() {
    this.open = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="timeline-card">
        <status-item
          icon="${'image'}"
          title="${'First try of the integration'}"
          date="${'13/6/2022'}"
        >
        </status-item>
        <status-item
          icon="${'image'}"
          title="${"Something happened here, I guess it's related to the"}"
          date="${'15/6/2022'}"
        >
        </status-item>
        <status-item
          icon="${'image'}"
          title="${'From here on, you had 199 failing requests'}"
          date="${'16/6/2022'}"
        >
        </status-item>
        <status-item
          icon="${'image'}"
          title="${'All Good'}"
          date="${'17/6/2022'}"
        >
        </status-item>
      </div>
    `;
  }
}
customElements.define('status-timeline', StatusTimeline);
