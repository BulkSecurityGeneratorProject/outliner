import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L3Table from './l-3-table';
import L3TableDetail from './l-3-table-detail';
import L3TableUpdate from './l-3-table-update';
import L3TableDeleteDialog from './l-3-table-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L3TableUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L3TableUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L3TableDetail} />
      <ErrorBoundaryRoute path={match.url} component={L3Table} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L3TableDeleteDialog} />
  </>
);

export default Routes;
