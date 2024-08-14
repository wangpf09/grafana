import { PluginExposedComponentConfig } from '@grafana/data';

import { PluginPreloadResult } from '../../pluginPreloader';
import { logWarning } from '../utils';

import { Registry } from './Registry';

export type RegistryType = {
  [id: string]: Array<{
    pluginId: string;
    title: string;
    description: string;
    component: React.ComponentType<{}>;
  }>;
};

export class AddedComponentsRegistry extends Registry<RegistryType> {
  constructor(initialState: RegistryType = {}) {
    super({
      initialState,
    });
  }

  mapToRegistry(registry: RegistryType, item: PluginPreloadResult): RegistryType {
    const { pluginId, error, addedComponentConfigs } = item;

    // TODO: We should probably move this section to where we load the plugin since this is only used
    // to provide a log to the user.
    if (error) {
      logWarning(`"${pluginId}" plugin failed to load, skip registering its extensions.`);
      return registry;
    }

    for (const config of addedComponentConfigs) {
      // assertStringProps(extension, ['title', 'description', 'extensionPointId']);
      // assert targets are valid ()
      // assertIsReactComponent(extension.component);

      const extensionPointIds = Array.isArray(config.targets) ? config.targets : [config.targets];

      for (const extensionPointId of extensionPointIds) {
        if (!(extensionPointId in registry)) {
          registry[extensionPointId] = [];
        }

        registry[extensionPointId].push({
          ...config,
          pluginId,
        });
      }
    }

    return registry;
  }
}
