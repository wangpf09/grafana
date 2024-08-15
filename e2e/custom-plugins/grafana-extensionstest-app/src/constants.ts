import pluginJson from './plugin.json';

export const PLUGIN_BASE_URL = `/a/${pluginJson.id}`;

export enum ROUTES {
  One = 'one',
  LegacyAPIs = 'legacy-apis',
  ExposedComponents = 'exposed-components',
  Three = 'three',
  Four = 'four',
}
