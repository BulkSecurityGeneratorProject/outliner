import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-3-table.reducer';
import { IL3Table } from 'app/shared/model/l-3-table.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL3TableDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L3TableDetail extends React.Component<IL3TableDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l3TableEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L3Table [<b>{l3TableEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l3TableEntity.classification}</dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l3TableEntity.position}</dd>
            <dt>
              <span id="flag">Flag</span>
            </dt>
            <dd>{l3TableEntity.flag}</dd>
            <dt>L 3</dt>
            <dd>{l3TableEntity.l3 ? l3TableEntity.l3.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-3-table" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-3-table/${l3TableEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l3Table }: IRootState) => ({
  l3TableEntity: l3Table.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L3TableDetail);
