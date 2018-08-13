import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-1.reducer';
import { IL1 } from 'app/shared/model/l-1.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL1DetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L1Detail extends React.Component<IL1DetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l1Entity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L1 [<b>{l1Entity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l1Entity.classification}</dd>
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{l1Entity.title}</dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l1Entity.position}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-1" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-1/${l1Entity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l1 }: IRootState) => ({
  l1Entity: l1.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L1Detail);
