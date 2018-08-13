import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L3Row from './l-3-row';
import L3RowDetail from './l-3-row-detail';
import L3RowUpdate from './l-3-row-update';
import L3RowDeleteDialog from './l-3-row-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L3RowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L3RowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L3RowDetail} />
      <ErrorBoundaryRoute path={match.url} component={L3Row} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L3RowDeleteDialog} />
  </>
);

export default Routes;
