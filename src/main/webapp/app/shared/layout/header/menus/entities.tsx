import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/l-1">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 1
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/l-2">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 2
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/l-3">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 3
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/l-3-table">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 3 Table
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/l-3-row">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 3 Row
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/l-3-cell">
      <FontAwesomeIcon icon="asterisk" />&nbsp;L 3 Cell
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
