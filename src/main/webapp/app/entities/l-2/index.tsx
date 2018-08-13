import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import L2 from './l-2';
import L2Detail from './l-2-detail';
import L2Update from './l-2-update';
import L2DeleteDialog from './l-2-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={L2Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={L2Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={L2Detail} />
      <ErrorBoundaryRoute path={match.url} component={L2} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={L2DeleteDialog} />
  </>
);

export default Routes;
