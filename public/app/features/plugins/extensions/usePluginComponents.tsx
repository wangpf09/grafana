import { useMemo } from 'react';
import { useObservable } from 'react-use';

import { UsePluginComponentsResult } from '@grafana/runtime/src/services/pluginExtensions/getPluginExtensions';

import { AddedComponentsRegistry } from './registry/AddedComponentsRegistry';

// Returns a component exposed by a plugin.
// (Exposed components can be defined in plugins by calling .exposeComponent() on the AppPlugin instance.)
export function createUsePluginComponents(registry: AddedComponentsRegistry) {
  const observableRegistry = registry.asObservable();

  return function usePluginComponents<Props extends object = {}>(id: string): UsePluginComponentsResult<Props> {
    const registry = useObservable(observableRegistry);

    return useMemo(() => {
      if (!registry || !registry[id]) {
        return {
          isLoading: false,
          components: [],
        };
      }

      const registryItem = registry[id];
      return {
        isLoading: false,
        components: registryItem.map((item) => item.component as React.ComponentType<Props>),
      };
    }, [id, registry]);
  };
}
