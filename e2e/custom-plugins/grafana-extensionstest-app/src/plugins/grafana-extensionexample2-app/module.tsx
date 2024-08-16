import React from 'react';
import { AppPlugin } from '@grafana/data';
import { App } from './components/App';
import { testIds } from './testIds';

console.log('Hello from app B');
export const plugin = new AppPlugin<{}>()
  .setRootPage(App)
  .configureExtensionLink({
    title: 'Open from B',
    description: 'Open a modal from plugin B',
    extensionPointId: 'plugins/grafana-extensionstest-app/actions',
    onClick: (_, { openModal }) => {
      openModal({
        title: 'Modal from app B',
        body: () => <div data-testid={testIds.appB.modal}>From plugin B</div>,
      });
    },
  })
  .configureExtensionComponent({
    extensionPointId: 'plugins/grafana-extensionexample2-app/configure-extension-component/v1',
    title: 'Configure extension component from B',
    description: 'A component that can be reused by other app plugins. Inserted with configureExtensionComponent api',
    component: ({ name }: { name: string }) => <div data-testid={testIds.appB.reusableComponent}>Hello {name}!</div>,
  });
