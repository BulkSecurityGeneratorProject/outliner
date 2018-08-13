import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L3 from './l-3';
import L3Detail from './l-3-detail';
import L3Update from './l-3-update';
import L3DeleteDialog from './l-3-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L3Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L3Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L3Detail} />
      <ErrorBoundaryRoute path={match.url} component={L3} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L3DeleteDialog} />
  </>
);

export default Routes;
