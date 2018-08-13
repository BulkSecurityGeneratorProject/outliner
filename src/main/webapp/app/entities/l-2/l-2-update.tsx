import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IL1 } from 'app/shared/model/l-1.model';
import { getEntities as getL1S } from 'app/entities/l-1/l-1.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './l-2.reducer';
import { IL2 } from 'app/shared/model/l-2.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IL2UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IL2UpdateState {
  isNew: boolean;
  l1Id: number;
}

export class L2Update extends React.Component<IL2UpdateProps, IL2UpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      l1Id: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getL1S();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { l2Entity } = this.props;
      const entity = {
        ...l2Entity,
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
    this.props.history.push('/entity/l-2');
  };

  l1Update = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        l1Id: -1
      });
    } else {
      for (const i in this.props.l1S) {
        if (id === this.props.l1S[i].id.toString()) {
          this.setState({
            l1Id: this.props.l1S[i].id
          });
        }
      }
    }
  };

  render() {
    const { l2Entity, l1S, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content } = l2Entity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="outlinerApp.l2.home.createOrEditLabel">Create or edit a L2</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : l2Entity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="l-2-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="classificationLabel" for="classification">
                    Classification
                  </Label>
                  <AvField
                    id="l-2-classification"
                    type="text"
                    name="classification"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="l-2-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="positionLabel" for="position">
                    Position
                  </Label>
                  <AvField
                    id="l-2-position"
                    type="text"
                    name="position"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    Content
                  </Label>
                  <AvInput
                    id="l-2-content"
                    type="textarea"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="l1.id">L 1</Label>
                  <AvInput id="l-2-l1" type="select" className="form-control" name="l1.id" onChange={this.l1Update}>
                    <option value="" key="0" />
                    {l1S
                      ? l1S.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/l-2" replace color="info">
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
  l1S: storeState.l1.entities,
  l2Entity: storeState.l2.entity,
  loading: storeState.l2.loading,
  updating: storeState.l2.updating
});

const mapDispatchToProps = {
  getL1S,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L2Update);
