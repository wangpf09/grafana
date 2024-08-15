import { PluginAddedComponentConfig } from '@grafana/data';

import { wrapWithPluginContext } from '../utils';

import { PluginExtensionConfigs, Registry, RegistryType } from './Registry';

export type AddedComponentConfig<Props = {}> = {
  title: string;
  description: string;
  component: React.ComponentType<Props>;
};

export class AddedComponentsRegistry extends Registry<AddedComponentConfig[], PluginAddedComponentConfig> {
  constructor(initialState: RegistryType<AddedComponentConfig[]> = {}) {
    super({
      initialState,
    });
  }

  mapToRegistry(
    registry: RegistryType<AddedComponentConfig[]>,
    item: PluginExtensionConfigs<PluginAddedComponentConfig>
  ): RegistryType<AddedComponentConfig[]> {
    const { pluginId, configs } = item;

    for (const config of configs) {
      // assertStringProps(extension, ['title', 'description', 'extensionPointId']);
      // assert targets are valid ()
      // assertIsReactComponent(extension.component);

      const extensionPointIds = Array.isArray(config.targets) ? config.targets : [config.targets];
      for (const extensionPointId of extensionPointIds) {
        const result = {
          component: wrapWithPluginContext(pluginId, config.component),
          description: config.description,
          title: config.title,
        };

        if (!(extensionPointId in extensionPointIds)) {
          registry[extensionPointId] = {
            pluginId,
            config: [result],
          };
        } else {
          registry[extensionPointId].config.push(result);
        }
      }
    }

    return registry;
  }
}
