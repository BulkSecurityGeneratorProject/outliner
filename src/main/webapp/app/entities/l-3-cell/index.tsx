import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L3Cell from './l-3-cell';
import L3CellDetail from './l-3-cell-detail';
import L3CellUpdate from './l-3-cell-update';
import L3CellDeleteDialog from './l-3-cell-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L3CellUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L3CellUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L3CellDetail} />
      <ErrorBoundaryRoute path={match.url} component={L3Cell} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L3CellDeleteDialog} />
  </>
);

export default Routes;
