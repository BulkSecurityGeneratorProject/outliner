import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IL3Table } from 'app/shared/model/l-3-table.model';
import { getEntities as getL3Tables } from 'app/entities/l-3-table/l-3-table.reducer';
import { getEntity, updateEntity, createEntity, reset } from './l-3-row.reducer';
import { IL3Row } from 'app/shared/model/l-3-row.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IL3RowUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IL3RowUpdateState {
  isNew: boolean;
  tableId: number;
}

export class L3RowUpdate extends React.Component<IL3RowUpdateProps, IL3RowUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tableId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getL3Tables();
  }

  saveEntity = (event, errors, values) => {
    values.datetime = new Date(values.datetime);

    if (errors.length === 0) {
      const { l3RowEntity } = this.props;
      const entity = {
        ...l3RowEntity,
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
    this.props.history.push('/entity/l-3-row');
  };

  tableUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        tableId: -1
      });
    } else {
      for (const i in this.props.l3Tables) {
        if (id === this.props.l3Tables[i].id.toString()) {
          this.setState({
            tableId: this.props.l3Tables[i].id
          });
        }
      }
    }
  };

  render() {
    const { l3RowEntity, l3Tables, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="outlinerApp.l3Row.home.createOrEditLabel">Create or edit a L3Row</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : l3RowEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="l-3-row-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="classificationLabel" for="classification">
                    Classification
                  </Label>
                  <AvField id="l-3-row-classification" type="text" name="classification" />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="l-3-row-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="datetimeLabel" for="datetime">
                    Datetime
                  </Label>
                  <AvInput
                    id="l-3-row-datetime"
                    type="datetime-local"
                    className="form-control"
                    name="datetime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.l3RowEntity.datetime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="positionLabel" for="position">
                    Position
                  </Label>
                  <AvField
                    id="l-3-row-position"
                    type="text"
                    name="position"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="table.id">Table</Label>
                  <AvInput id="l-3-row-table" type="select" className="form-control" name="table.id" onChange={this.tableUpdate}>
                    <option value="" key="0" />
                    {l3Tables
                      ? l3Tables.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/l-3-row" replace color="info">
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
  l3Tables: storeState.l3Table.entities,
  l3RowEntity: storeState.l3Row.entity,
  loading: storeState.l3Row.loading,
  updating: storeState.l3Row.updating
});

const mapDispatchToProps = {
  getL3Tables,
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
)(L3RowUpdate);
