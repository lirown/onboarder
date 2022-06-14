import { LitElement, html, css, property } from 'lit-element';

export class StatusBar extends LitElement {
  static get properties() {
    return {
      statusType: { type: String },
      title: { type: String },
      shifted: { type: Boolean }
    };
  }
  static get styles() {
    return css`
      .status-bar {
        transition: transform 0.3s;
        border-radius: 3px;
        width: 100%;
        height: 100%;
        cursor: pointer;

        background-image: radial-gradient(
          circle,
          rgba(187, 187, 187, 1) 0%,
          rgba(92, 92, 92, 1) 100%
        );

        background-size: 300% 300%;
        background-position: -200% -200%;
      }

      .card .back {
        background-image: radial-gradient(
          circle,
          rgb(111, 111, 111) 0%,
          rgb(59, 59, 59) 100%
        );

        background-size: 300% 300%;
        background-position: -200% -200%;
      }

      .shifted {
        transform: scale(1.2);
      }

      .success {
        background-image: radial-gradient(
          circle,
          rgba(90, 246, 75, 1) 0%,
          rgba(2, 176, 113, 1) 100%
        );
      }

      .partial {
        background-image: radial-gradient(
          circle,
          rgba(246, 238, 75, 1) 0%,
          rgba(246, 159, 65, 1) 100%
        );
      }

      label {
        font-size: 50px;
        -webkit-perspective: 100px;
        perspective: 100px;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .card {
        position: relative;
        height: 100%;
        width: 100%;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transition: all 600ms;
        transition: all 600ms;
        z-index: 20;
      }

      .card div {
        position: absolute;
        height: 100%;
        width: 100%;
        text-align: center;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 2px;
      }

      .card div:last-of-type {
        color: #fff;
        -webkit-transform: rotateY(180deg);
        transform: rotateY(180deg);
      }

      input {
        display: none;
      }

      :checked + .card {
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
      }

      .data {
        position: fixed;

        top: 90vh;
        left: 90vw;
        background: blue;
        height: 100px;
        width: 100px;
      }
    `;
  }

  getClass() {
    const classes = ['status-bar'];

    this.statusType === 'success' && classes.push('success');
    this.statusType === 'partial' && classes.push('partial');
    this.shifted && classes.push('shifted');

    return classes.join(' ');
  }

  render() {
    return html`<label>
      <input type="checkbox" />
      <div class="card">
        <div class="${this.getClass()}"></div>
        <div class="back"></div>
      </div>
    </label> `;
  }

  toggle() {
    this.shifted = !this.shifted;
  }
}
customElements.define('status-bar', StatusBar);
