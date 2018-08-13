import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IL3 } from 'app/shared/model/l-3.model';
import { getEntities as getL3S } from 'app/entities/l-3/l-3.reducer';
import { getEntity, updateEntity, createEntity, reset } from './l-3-table.reducer';
import { IL3Table } from 'app/shared/model/l-3-table.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IL3TableUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IL3TableUpdateState {
  isNew: boolean;
  l3Id: number;
}

export class L3TableUpdate extends React.Component<IL3TableUpdateProps, IL3TableUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      l3Id: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getL3S();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { l3TableEntity } = this.props;
      const entity = {
        ...l3TableEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/l-3-table');
  };

  l3Update = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        l3Id: -1
      });
    } else {
      for (const i in this.props.l3S) {
        if (id === this.props.l3S[i].id.toString()) {
          this.setState({
            l3Id: this.props.l3S[i].id
          });
        }
      }
    }
  };

  render() {
    const { l3TableEntity, l3S, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="outlinerApp.l3Table.home.createOrEditLabel">Create or edit a L3Table</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : l3TableEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="l-3-table-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="classificationLabel" for="classification">
                    Classification
                  </Label>
                  <AvField id="l-3-table-classification" type="text" name="classification" />
                </AvGroup>
                <AvGroup>
                  <Label id="positionLabel" for="position">
                    Position
                  </Label>
                  <AvField id="l-3-table-position" type="text" name="position" />
                </AvGroup>
                <AvGroup>
                  <Label id="flagLabel" for="flag">
                    Flag
                  </Label>
                  <AvField id="l-3-table-flag" type="text" name="flag" />
                </AvGroup>
                <AvGroup>
                  <Label for="l3.id">L 3</Label>
                  <AvInput id="l-3-table-l3" type="select" className="form-control" name="l3.id" onChange={this.l3Update}>
                    <option value="" key="0" />
                    {l3S
                      ? l3S.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/l-3-table" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  l3S: storeState.l3.entities,
  l3TableEntity: storeState.l3Table.entity,
  loading: storeState.l3Table.loading,
  updating: storeState.l3Table.updating
});

const mapDispatchToProps = {
  getL3S,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L3TableUpdate);
