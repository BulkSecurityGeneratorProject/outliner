import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L1 from './l-1';
import L2 from './l-2';
import L3 from './l-3';
import L3Table from './l-3-table';
import L3Row from './l-3-row';
import L3Cell from './l-3-cell';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/l-1`} component={L1} />
      <ErrorBoundaryRoute path={`${match.url}/l-2`} component={L2} />
      <ErrorBoundaryRoute path={`${match.url}/l-3`} component={L3} />
      <ErrorBoundaryRoute path={`${match.url}/l-3-table`} component={L3Table} />
      <ErrorBoundaryRoute path={`${match.url}/l-3-row`} component={L3Row} />
      <ErrorBoundaryRoute path={`${match.url}/l-3-cell`} component={L3Cell} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
