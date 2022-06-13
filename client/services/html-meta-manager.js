/**
 * Apply meta tags to specific page for optimized SEO
 * @param {Object} args
 * @param {String} args.title - title tag
 * @param {String} args.titleTemplate - title tag template
 * @param {String} args.description - description tag
 * @param {Object} args.image - image tag properties like url, alt, width, height
 * @param {String} args.url - url tag
 */
export const updateMetadata = ({
  title,
  titleTemplate,
  description,
  descriptionTemplate,
  image,
  url
}) => {
  const [param1, param2] = location.href
    .split('/')
    .reverse()
    .map((x) => x.split('-').join(' '));

  const finalTitle = titleTemplate
    ? titleTemplate
        .replace('%s', title)
        .replace('%1', param1)
        .replace('%2', param2)
    : title;

  if (finalTitle) {
    document.title = finalTitle;
    setMetaTag('property', 'og:title', finalTitle);
  }

  const finalDescription = descriptionTemplate
    ? descriptionTemplate.replace('%1', param1).replace('%2', param2)
    : description;

  if (finalDescription) {
    setMetaTag('name', 'description', finalDescription);
    setMetaTag('property', 'og:description', finalDescription);
  } else if (finalDescription === null) {
    setMetaTag('name', 'description', '');
    setMetaTag('property', 'og:description', '');
  }

  if (image) {
    if (image.url) {
      setMetaTag('property', 'og:image', image.url);
    }
    if (image.alt) {
      setMetaTag('property', 'og:image:alt', image.alt);
    }
    if (image.width) {
      setMetaTag('property', 'og:image:width', image.width);
    }
    if (image.height) {
      setMetaTag('property', 'og:image:height', image.height);
    }
  } else if (image === null) {
    setMetaTag('property', 'og:image', '');
    setMetaTag('property', 'og:image:alt', '');
    setMetaTag('property', 'og:image:width', '');
    setMetaTag('property', 'og:image:height', '');
  }

  if (url) {
    setLinkTag('canonical', url);
    setMetaTag('property', 'og:url', url);
  }
};

/**
 * create meta tag for SEO optimization
 * @param {Object} args
 * @param {String} args.attributeName - name of the attribute in the tag
 * @param {String} args.attributeValue - value of the attribute in the tag
 * @param {String} args.content - content of tag
 */
export const setMetaTag = (attributeName, attributeValue, content) => {
  let element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

/**
 * delete meta tag for SEO optimization
 * @param {Object} args
 * @param {String} args.attributeName - name of the attribute in the tag
 * @param {String} args.attributeValue - value of the attribute in the tag
 */
export const removeMetaTag = (attributeName, attributeValue) => {
  const element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (element) {
    document.head.removeChild(element);
  }
};

/**
 * delete link tag for SEO optimization
 * @param {Object} args
 * @param {String} args.rel - path of the attribute in the tag
 * @param {String} args.href - link of the attribute in the tag
 */
export const setLinkTag = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};
