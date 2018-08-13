import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import l1, {
  L1State
} from 'app/entities/l-1/l-1.reducer';
// prettier-ignore
import l2, {
  L2State
} from 'app/entities/l-2/l-2.reducer';
// prettier-ignore
import l3, {
  L3State
} from 'app/entities/l-3/l-3.reducer';
// prettier-ignore
import l3Table, {
  L3TableState
} from 'app/entities/l-3-table/l-3-table.reducer';
// prettier-ignore
import l3Row, {
  L3RowState
} from 'app/entities/l-3-row/l-3-row.reducer';
// prettier-ignore
import l3Cell, {
  L3CellState
} from 'app/entities/l-3-cell/l-3-cell.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly l1: L1State;
  readonly l2: L2State;
  readonly l3: L3State;
  readonly l3Table: L3TableState;
  readonly l3Row: L3RowState;
  readonly l3Cell: L3CellState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  l1,
  l2,
  l3,
  l3Table,
  l3Row,
  l3Cell,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
