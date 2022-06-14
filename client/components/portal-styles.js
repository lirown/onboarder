import { LitElement, html, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

/**
 * Allow using <style>{someStyleVar}</style>
 * @type {string}
 */
const styleTagName = 'style';
export const styleTag = (style) => {
  return unsafeHTML(`<${styleTagName}>${style}</${styleTagName}>`);
};

import colors from '@forter/styles/colors.css';
import fonts from '@forter/styles/fonts.css';
import spacing from '@forter/styles/spacing.css';
import style from '@forter/styles/style.css';

// This component is a container that holds all the portal global css (colors, fonts etc..)
export class PortalStyle extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const styles = `${colors} ${fonts} ${spacing} ${style}`;
    return html`${styleTag(styles)}`;
  }
}
