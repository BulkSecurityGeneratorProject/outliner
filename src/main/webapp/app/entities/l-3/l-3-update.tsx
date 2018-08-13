import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IL2 } from 'app/shared/model/l-2.model';
import { getEntities as getL2S } from 'app/entities/l-2/l-2.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './l-3.reducer';
import { IL3 } from 'app/shared/model/l-3.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IL3UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IL3UpdateState {
  isNew: boolean;
  l2Id: number;
}

export class L3Update extends React.Component<IL3UpdateProps, IL3UpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      l2Id: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getL2S();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { l3Entity } = this.props;
      const entity = {
        ...l3Entity,
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
    this.props.history.push('/entity/l-3');
  };

  l2Update = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        l2Id: -1
      });
    } else {
      for (const i in this.props.l2S) {
        if (id === this.props.l2S[i].id.toString()) {
          this.setState({
            l2Id: this.props.l2S[i].id
          });
        }
      }
    }
  };

  render() {
    const { l3Entity, l2S, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content } = l3Entity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="outlinerApp.l3.home.createOrEditLabel">Create or edit a L3</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : l3Entity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="l-3-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="classificationLabel" for="classification">
                    Classification
                  </Label>
                  <AvField
                    id="l-3-classification"
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
                    id="l-3-title"
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
                    id="l-3-position"
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
                    id="l-3-content"
                    type="textarea"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="l2.id">L 2</Label>
                  <AvInput id="l-3-l2" type="select" className="form-control" name="l2.id" onChange={this.l2Update}>
                    <option value="" key="0" />
                    {l2S
                      ? l2S.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/l-3" replace color="info">
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
  l2S: storeState.l2.entities,
  l3Entity: storeState.l3.entity,
  loading: storeState.l3.loading,
  updating: storeState.l3.updating
});

const mapDispatchToProps = {
  getL2S,
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
)(L3Update);
