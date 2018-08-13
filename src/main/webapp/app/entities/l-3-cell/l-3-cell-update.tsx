import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IL3Row } from 'app/shared/model/l-3-row.model';
import { getEntities as getL3Rows } from 'app/entities/l-3-row/l-3-row.reducer';
import { getEntity, updateEntity, createEntity, reset } from './l-3-cell.reducer';
import { IL3Cell } from 'app/shared/model/l-3-cell.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IL3CellUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IL3CellUpdateState {
  isNew: boolean;
  rowId: number;
}

export class L3CellUpdate extends React.Component<IL3CellUpdateProps, IL3CellUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      rowId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getL3Rows();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { l3CellEntity } = this.props;
      const entity = {
        ...l3CellEntity,
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
    this.props.history.push('/entity/l-3-cell');
  };

  rowUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        rowId: -1
      });
    } else {
      for (const i in this.props.l3Rows) {
        if (id === this.props.l3Rows[i].id.toString()) {
          this.setState({
            rowId: this.props.l3Rows[i].id
          });
        }
      }
    }
  };

  render() {
    const { l3CellEntity, l3Rows, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="outlinerApp.l3Cell.home.createOrEditLabel">Create or edit a L3Cell</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : l3CellEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="l-3-cell-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="classificationLabel" for="classification">
                    Classification
                  </Label>
                  <AvField id="l-3-cell-classification" type="text" name="classification" />
                </AvGroup>
                <AvGroup>
                  <Label id="positionLabel" for="position">
                    Position
                  </Label>
                  <AvField
                    id="l-3-cell-position"
                    type="text"
                    name="position"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="value">
                    Value
                  </Label>
                  <AvField id="l-3-cell-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label for="row.id">Row</Label>
                  <AvInput id="l-3-cell-row" type="select" className="form-control" name="row.id" onChange={this.rowUpdate}>
                    <option value="" key="0" />
                    {l3Rows
                      ? l3Rows.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/l-3-cell" replace color="info">
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
  l3Rows: storeState.l3Row.entities,
  l3CellEntity: storeState.l3Cell.entity,
  loading: storeState.l3Cell.loading,
  updating: storeState.l3Cell.updating
});

const mapDispatchToProps = {
  getL3Rows,
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
)(L3CellUpdate);
