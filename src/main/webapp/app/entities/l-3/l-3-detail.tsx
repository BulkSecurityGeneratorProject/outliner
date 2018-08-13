import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './l-3.reducer';
import { IL3 } from 'app/shared/model/l-3.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IL3DetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class L3Detail extends React.Component<IL3DetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { l3Entity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            L3 [<b>{l3Entity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="classification">Classification</span>
            </dt>
            <dd>{l3Entity.classification}</dd>
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{l3Entity.title}</dd>
            <dt>
              <span id="position">Position</span>
            </dt>
            <dd>{l3Entity.position}</dd>
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{l3Entity.content}</dd>
            <dt>L 2</dt>
            <dd>{l3Entity.l2 ? l3Entity.l2.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/l-3" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/l-3/${l3Entity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ l3 }: IRootState) => ({
  l3Entity: l3.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L3Detail);
