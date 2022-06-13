import { html } from '../components/base';

/**
 * Adding section to promote sharing the app
 * @return {HTMLElement}
 */

export function ShareSection() {
  const share = () =>
    navigator &&
    navigator.share &&
    navigator.share({
      title: 'Onboarding Forter',
      text: 'Check out Onboarder and smooth your onboarding experience.',
      url: 'https://lirown.github.io/onboarder'
    });

  if (navigator.share) {
    return html` <div>
      Like what you see? please
      <a href="#" @click="${share}"> share </a>
      with your friends
    </div>`;
  }
}
