/**
 * Save a content of a file by name
 * @return {Event} of the value for the speicific config
 */
export function setConfigKey(path, value) {
  localStorage.setItem(path, value);
  document.dispatchEvent(
    new CustomEvent(`set:config.${path}`, { detail: value })
  );
}

/**
 * Get a state of user after login
 * @return {Promise<String>}
 */
export async function getConfigKey(path) {
  return localStorage.getItem(path);
}
