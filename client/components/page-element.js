import { LitElement } from '../components/base';

import config from '../config';

import { updateMetadata } from '../services/html-meta-manager';

// Add metadata options to the @vaadin/router BaseRoute

export class PageElement extends LitElement {
  location = {};

  data = new Promise((res) => res);

  defaultTitleTemplate = `%s | ${config.appName}`;

  getTitleTemplate(titleTemplate) {
    return titleTemplate || titleTemplate === null
      ? titleTemplate
      : this.defaultTitleTemplate;
  }

  metadata(route) {
    return route.metadata;
  }

  updateMetadata() {
    const { route } = this.location;

    if (!route) {
      return;
    }

    const metadata = this.metadata(route);

    if (metadata) {
      const defaultMetadata = {
        url: window.location.href,
        titleTemplate: this.getTitleTemplate(metadata.titleTemplate)
      };

      updateMetadata({
        ...defaultMetadata,
        ...metadata
      });
    }
  }

  createRenderRoot() {
    return this;
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    this.updateMetadata();
  }
}
