import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L1 from './l-1';
import L1Detail from './l-1-detail';
import L1Update from './l-1-update';
import L1DeleteDialog from './l-1-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L1Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L1Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L1Detail} />
      <ErrorBoundaryRoute path={match.url} component={L1} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L1DeleteDialog} />
  </>
);

export default Routes;
