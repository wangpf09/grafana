import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRootProps } from '@grafana/data';
import { ROUTES } from '../../constants';
import { PageFour, PageOne, PageThree, LegacyAPIs } from '../../pages';
import { testIds } from 'components/testIds';
import { ExposedComponents } from 'pages/ExposedComponents';

export function App(props: AppRootProps) {
  return (
    <div data-testid={testIds.container} style={{ marginTop: '5%' }}>
      <Routes>
        <Route path={ROUTES.ExposedComponents} element={<ExposedComponents />} />
        <Route path={ROUTES.LegacyAPIs} element={<LegacyAPIs />} />
        <Route path={`${ROUTES.Three}/:id?`} element={<PageThree />} />

        {/* Full-width page (this page will have no side navigation) */}
        <Route path={ROUTES.Four} element={<PageFour />} />

        {/* Default page */}
        <Route path="*" element={<PageOne />} />
      </Routes>
    </div>
  );
}
