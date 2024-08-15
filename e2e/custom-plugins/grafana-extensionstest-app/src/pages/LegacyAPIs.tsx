import React from 'react';
import { testIds } from '../components/testIds';
import { PluginPage, getPluginExtensions } from '@grafana/runtime';
import { ActionButton } from 'components/ActionButton';

type AppExtensionContext = {};

export function LegacyAPIs() {
  const extensionPointId = 'plugins/grafana-extensionstest-app/actions';
  const context: AppExtensionContext = {};

  const { extensions } = getPluginExtensions({
    extensionPointId,
    context,
  });
  console.log('extensions', extensions);

  return (
    <PluginPage>
      <div data-testid={testIds.pageTwo.container}>
        <ActionButton extensions={extensions} />
      </div>
    </PluginPage>
  );
}
