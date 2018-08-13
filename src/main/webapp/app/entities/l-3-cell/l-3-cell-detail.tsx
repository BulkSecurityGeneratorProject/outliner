import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-3-cell.reducer';
import { IL3Cell } from 'app/shared/model/l-3-cell.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL3CellDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L3CellDetail extends React.Component<IL3CellDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l3CellEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L3Cell [<b>{l3CellEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l3CellEntity.classification}</dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l3CellEntity.position}</dd>
            <dt>
              <span id="value">Value</span>
            </dt>
            <dd>{l3CellEntity.value}</dd>
            <dt>Row</dt>
            <dd>{l3CellEntity.row ? l3CellEntity.row.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-3-cell" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-3-cell/${l3CellEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l3Cell }: IRootState) => ({
  l3CellEntity: l3Cell.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L3CellDetail);
