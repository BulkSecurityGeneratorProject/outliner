import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-2.reducer';
import { IL2 } from 'app/shared/model/l-2.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL2DetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L2Detail extends React.Component<IL2DetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l2Entity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L2 [<b>{l2Entity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l2Entity.classification}</dd>
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{l2Entity.title}</dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l2Entity.position}</dd>
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{l2Entity.content}</dd>
            <dt>L 1</dt>
            <dd>{l2Entity.l1 ? l2Entity.l1.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-2" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-2/${l2Entity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l2 }: IRootState) => ({
  l2Entity: l2.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L2Detail);
