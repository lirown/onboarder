import { html } from '../components/base';
import { PageElement } from '../components';

/**
 * Reward Page - Dashboard to show status of the Onboarding.
 *
 * @element page-reward
 */
export class PageReward extends PageElement {
  /** @inheritdoc */
  render() {
    return html`
      <html>
        <script></script>

        <style>
          body {
            padding: 10px;
          }

          .container {
            width: 100%;
            max-width: 1500px;
          }

          .art {
            width: 150px;
            margin: auto;
            position: relative;
            top: 60px;
            margin-bottom: 100px;
            animation: 1s to-top cubic-bezier(0.18, 1.51, 0.34, 0.9);
            animation: idle 2s alternate infinite cubic-bezier(0.52, 0, 0.28, 1);
          }

          .art svg {
            position: absolute;
            width: 35px;
            left: 50%;
            top: 50px;
            transform: translateX(-50%);
          }

          .score-container {
            background-color: white;
            box-shadow: #3d414424 0 0 15px 0;
            border-radius: 10px;
            animation: 1s to-top cubic-bezier(0.18, 1.51, 0.34, 0.9);
          }

          .score-container .copy {
            text-align: center;
            opacity: 0;
            animation: 1s 0.2s to-top forwards
              cubic-bezier(0.18, 1.51, 0.34, 0.9);
          }

          .title {
            font-weight: 600;
            margin: 0;
          }

          .description {
            color: #8696ac;
            font-size: 14px;
            margin-top: 5px;
            padding: 0 30px;
            max-width: 300px;
          }

          .action-button {
            background-color: #00a5ff;
            outline: none;
            border: none;
            padding: 7px 20px;
            border-radius: 100px;
            color: white;
            font-size: 14px;
            box-shadow: 0px 4.528800010681152px 3.623039960861206px 0px
              rgba(0, 71, 255, 0.0244);
            box-shadow: 0px 4.519999980926514px 6.019999980926514px 0px
              rgba(0, 71, 255, 0.035);
            box-shadow: 0px 5.150000095367432px 7.119999885559082px 0px
              rgba(0, 71, 255, 0.0456);
            box-shadow: 0px 10px 10px 0px rgba(0, 71, 255, 0.07);
            margin-bottom: 60px;
          }

          .reward-container {
            text-align: center;
            opacity: 0;
            animation: 1s 0.4s to-top forwards
              cubic-bezier(0.18, 1.51, 0.34, 0.9);
          }

          .highlighted-text {
            font-weight: 500;
            font-size: 14px;
            background-color: #00a6ff4c;
            color: #096be2;
            text-align: center;
            display: inline-block;
            padding: 5px 15px;
            border-radius: 100px;
            margin: 30px 0 15px;
          }

          @keyframes to-top {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
            }
          }

          @keyframes idle {
            from {
              transform: translateY(-10px);
            }
          }
        </style>

        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>

        <body>
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
                  <path
                    class="path st0"
                    d="M96.5,48.4c0,0,49.6-8.1,54.4,39.7"
                  />
                </svg>

                <img src="images/rewards.svg" alt="" srcset="" />
              </div>
              <section class="copy">
                <h3 class="title">You're almost there!</h3>
                <p class="description">
                  Keep adding data points in order to achieve superior fraud
                  detection.*
                </p>
                <button class="action-button">Call To Action</button>
              </section>
            </div>

            <div class="reward-container">
              <div class="highlighted-text">
                Finish the integration and get this reward
              </div>
              <img src="images/shirt.png" width="250" alt="" srcset="" />
            </div>
          </section>
        </body>
      </html>
    `;
  }
}

customElements.define('page-reward', PageReward);
