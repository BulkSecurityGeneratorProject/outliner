import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-3-row.reducer';
import { IL3Row } from 'app/shared/model/l-3-row.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL3RowDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L3RowDetail extends React.Component<IL3RowDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l3RowEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L3Row [<b>{l3RowEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l3RowEntity.classification}</dd>
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{l3RowEntity.title}</dd>
            <dt>
              <span id="datetime">Datetime</span>
            </dt>
            <dd>
              <TextFormat value={l3RowEntity.datetime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l3RowEntity.position}</dd>
            <dt>Table</dt>
            <dd>{l3RowEntity.table ? l3RowEntity.table.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-3-row" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-3-row/${l3RowEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l3Row }: IRootState) => ({
  l3RowEntity: l3Row.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L3RowDetail);
