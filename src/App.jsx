import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBTableHead,
  MDBTextArea,
  MDBSelect,
  MDBCheckbox,
  MDBRadio,
  MDBFile,
  MDBCard,
  MDBCardFooter,
  MDBCardBody
} from 'mdb-react-ui-kit';

import { MDBSortable, MDBSortableElement } from 'mdb-react-drag-and-drop';

import Header from './components/Header';
import AddFieldForm from './components/AddFieldForm';
import EditFieldForm from './components/EditFieldForm';
import fileHandler from './utilities/file_handler';

function App() {

  const [fields, setFields] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);

  const handleAddField = (field) => {
    setFields([...fields, field]);
  }

  const handleEditField = (field, index) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);
  }

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  }

  const dragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  }

  const dragOver = (e) => {
    e.preventDefault();
  }

  const drop = (e, index) => {
    const indexToMove = e.dataTransfer.getData('index');
    const newFields = [...fields];
    const elementToMove = newFields[indexToMove];
    newFields.splice(indexToMove, 1);
    newFields.splice(index, 0, elementToMove);
    setFields(newFields);
  }

  return (
    <>
      <MDBContainer fluid>
        <Header />
        <MDBRow>
          <MDBCol className='text-end'>
            <MDBBtn className='btn btn-secondary' onClick={() => fileHandler.exportDataToJson(fields)}>Exportar formulario</MDBBtn>
            {/* <MDBFile onChange={(e) => fileHandler.importDataFromJson(e, setFields)} /> */}
            <div className="btn btn-outline-secondary ms-2">
              <label htmlFor='json-file'>Importar formulario</label>
              <MDBFile id='json-file' className='form-control d-none' onChange={(e) => fileHandler.importDataFromJson(e, setFields)} accept='.json' />
            </div>
          </MDBCol>
        </MDBRow>
        <hr />
        <AddFieldForm addField={handleAddField} />

        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBRow
                >
                  <MDBCol size={'md-1'}>
                    #
                  </MDBCol>
                  <MDBCol size={'md-2'}>
                    Label
                  </MDBCol>
                  <MDBCol>Ejemplo</MDBCol>
                  <MDBCol size={'md-2'}>Acciones</MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol
          >

            {
              fields.map((field, index) => {
                return (
                  <MDBRow
                    key={index}
                    className="align-middle"
                    draggable={true}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => drop(e, index)}
                  >
                    <MDBCard>
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol
                            size={'md-1'}
                          >{index + 1}</MDBCol>
                          {
                            field.fieldType === 'text' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    maxLength={field.maxLength}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'textarea' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBTextArea
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    maxLength={field.maxLength}
                                    rows={field.hasRows && field.rows}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'number' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    min={field.hasMin && field.min}
                                    max={field.hasMax && field.max}
                                    step={field.hasStep && field.step}
                                    kpi={(field.isKPI).toString()}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'date' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    min={field.hasMin && field.min}
                                    max={field.hasMax && field.max}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'time' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    min={field.hasMin && field.min}
                                    max={field.hasMax && field.max}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'datetime' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    name={field.label}
                                    type='datetime-local'
                                    required={field.required}
                                    min={field.hasMin && field.min}
                                    max={field.hasMax && field.max}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'select' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBSelect
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    data={field.options}
                                    required={required}
                                    multiple={field.multiple}
                                    kpi={(field.isKPI).toString()}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'checkbox' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  {
                                    field.options.map((option, index) => {
                                      return (
                                        <MDBCheckbox
                                          key={index}
                                          label={option.text}
                                          name={field.label}
                                          type={field.fieldType}
                                          required={required}
                                          kpi={(field.isKPI)}
                                        />
                                      )
                                    })
                                  }
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'radio' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  {
                                    field.options.map((option, index) => {
                                      return (
                                        <MDBRadio
                                          key={index}
                                          label={option.text}
                                          name={field.label}
                                          type={field.fieldType}
                                          required={required}
                                          kpi={(field.isKPI)}
                                        />
                                      )
                                    })
                                  }
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'file' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBFile
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    multiple={field.multiple}
                                    accept={field.accept}
                                    size='lg'
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'email' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    maxLength={field.maxLength}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'url' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <MDBInput
                                    label={field.label}
                                    name={field.label}
                                    type={field.fieldType}
                                    required={field.required}
                                    maxLength={field.maxLength}
                                  />
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'hidden' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <div>
                                    <i>
                                      (Campo oculto)
                                    </i>
                                  </div>
                                  <div>
                                    <p>
                                      Valor: {field.value}
                                    </p>
                                  </div>
                                </MDBCol>
                              </>
                            )
                          }
                          {
                            field.fieldType === 'title' && (
                              <>
                                <MDBCol size={'md-2'}>{field.label}</MDBCol>
                                <MDBCol>
                                  <div>
                                    <i>
                                      (Título)
                                    </i>
                                  </div>
                                  <div>
                                    <h1>
                                      {field.value}
                                    </h1>
                                  </div>
                                </MDBCol>
                              </>
                            )
                          }
                          <MDBCol size={'md-2'}>
                            <EditFieldForm editField={handleEditField} deleteField={handleDeleteField} field={field} fieldPosition={index} />
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBRow>
                )
              })
            }

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default App;
