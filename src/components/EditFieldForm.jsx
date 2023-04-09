import React, { useState, useEffect } from 'react'
import {
    MDBCol,
    MDBRow,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBSelect,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit'
import { FIELD_TYPES } from '../utilities/data_constants'

export default function EditFieldForm({
    editField,
    deleteField,
    field,
    fieldPosition
}) {

    const [label, setLabel] = useState('');
    const [required, setRequired] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const [addFieldModal, setEditFieldModal] = useState(false);
    const [fieldTypes, setFieldTypes] = useState([]);
    const [fieldType, setFieldType] = useState(null);
    const [setupAvailable, setSetupAvailable] = useState(null);

    const [fieldOptionRows, setFieldOptionRows] = useState([]);

    const [hasMaxLength, setHasMaxLength] = useState(false);
    const [hasRows, setHasRows] = useState(false);
    const [hasMin, setHasMin] = useState(false);
    const [hasMax, setHasMax] = useState(false);
    const [hasStep, setHasStep] = useState(false);
    const [hasAccept, setHasAccept] = useState(false);
    const [hasValues, setHasValues] = useState(false);
    const [hasScores, setHasScores] = useState(false);

    const [maxLength, setMaxLength] = useState(2048);
    const [rows, setRows] = useState(3);
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [step, setStep] = useState(1.0);
    const [isKPI, setIsKPI] = useState(false);
    const [accept, setAccept] = useState('');
    const [value, setValue] = useState('');

    const handleLabelChange = (inputData) => {
        setLabel(inputData);
    }

    const toggleShowEditModal = () => {
        setFieldType(FIELD_TYPES.text.fieldType);
        setEditFieldModal(!addFieldModal);
        if (!addFieldModal) {
            resetForm();
        }
    };

    const resetForm = () => {

        let datas = Object.keys(FIELD_TYPES).map((key) => {
            let defaultStructure = {};
            defaultStructure.text = FIELD_TYPES[key].fieldName;
            defaultStructure.value = key;
            if (key === field.fieldType) {
                defaultStructure.defaultSelected = true;
            }
            return defaultStructure;
        });

        //console.log(field);
        setFieldTypes(datas);

        setHasMaxLength(field.hasMaxLength || false);
        setHasRows(field.hasRows || false);
        setHasMin(field.hasMin || false);
        setHasMax(field.hasMax || false);
        setHasStep(field.hasStep || false);
        setHasValues(field.hasValues || false);
        setHasScores(field.hasScores || false);
        setHasAccept(field.hasAccept || false);

        setRequired(field.required || false);
        setMultiple(field.multiple || false);
        setMaxLength(field.maxLength || false);
        setIsKPI(field.isKPI || false);
        setAccept(field.accept || false);
        setRows(field.rows || false);
        setMin(field.min || false);
        setMax(field.max || false);
        setStep(field.step || false);

        setValue(field.value || false);

        setFieldOptionRows([]);

        let fieldTypeLoaded = FIELD_TYPES[field.fieldType];

        handleFieldTypeChange({
            value: fieldTypeLoaded.fieldType,
            text: fieldTypeLoaded.fieldName
        });
        setFieldType(field.fieldType);

        let setupAvailableLoaded = fieldTypeLoaded.setupAvailable;

        setSetupAvailable(setupAvailableLoaded);

        handleLabelChange(field.label);

    }

    const handleFieldTypeChange = (item) => {
        let data = FIELD_TYPES[item.value];

        setFieldType(data.fieldType);
        setSetupAvailable(data.setupAvailable);
        setFieldOptionRows([]);
    }

    const handleAddOptionRow = () => {
        let item = {};
        item.option = '';
        item.value = '';
        item.score = 0;
        let data = [...fieldOptionRows, item];
        setFieldOptionRows(data);
    }

    const handleRemoveOptionRow = (index) => {
        let data = [...fieldOptionRows];
        data.splice(index, 1);
        setFieldOptionRows(data);
    }

    const handleOptionChange = (event, index) => {
        let data = [...fieldOptionRows];
        data[index].option = event.target.value;
        setFieldOptionRows(data);
    }

    const handleValueChange = (event, index) => {
        let data = [...fieldOptionRows];
        data[index].value = event.target.value;
        setFieldOptionRows(data);
    }

    const handleScoreChange = (event, index) => {
        let data = [...fieldOptionRows];
        data[index].score = event.target.value;
        setFieldOptionRows(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        field = {
            label: event.target.label.value,
            fieldType: fieldType,
            setupAvailable: setupAvailable,
        }
        if (required) {
            field.required = event.target.required.checked;
        }
        if (hasMaxLength) {
            field.hasMaxLength = event.target.hasMaxLength.checked;
            field.maxLength = event.target.maxLength.value;
        }
        if (hasRows) {
            field.hasRows = event.target.hasRows.checked;
            field.rows = event.target.rows.value;
        }
        if (hasMin) {
            field.hasMin = event.target.hasMin.checked;
            field.min = event.target.min.value;
        }
        if (hasMax) {
            field.hasMax = event.target.hasMax.checked;
            field.max = event.target.max.value;
        }
        if (hasStep) {
            field.hasStep = event.target.hasStep.checked;
            field.step = event.target.step.value;
        }
        if (fieldType === FIELD_TYPES.select.fieldType || fieldType === FIELD_TYPES.radio.fieldType || fieldType === FIELD_TYPES.checkbox.fieldType) {
            field.hasValues = event.target.hasValues.checked;
            field.hasScores = event.target.hasScores.checked;
            field.options = [];
            if (fieldType === FIELD_TYPES.select.fieldType) {
                field.multiple = event.target.multiple.checked;
            }
            fieldOptionRows.forEach((item) => {
                let option = {};
                option.text = item.option;
                option.value = item.value;
                option.score = item.score;
                field.options.push(option);
            }
            );
        }
        if (hasAccept) {
            field.hasAccept = event.target.hasAccept.checked;
            field.accept = event.target.accept.value;
        }
        if (isKPI) {
            field.isKPI = event.target.isKPI.checked;
        }
        if (fieldType === FIELD_TYPES.file.fieldType) {
            field.multiple = event.target.multiple.checked;
        }
        if (fieldType === FIELD_TYPES.hidden.fieldType || fieldType === FIELD_TYPES.title.fieldType) {
            field.value = event.target.value.value;
        }
        editField(field, fieldPosition);
        toggleShowEditModal();
    }

    useEffect(() => {
        resetForm();
    }, []);

    return (
        <MDBRow>
            <MDBCol className='text-center my-4'>
                <MDBBtn onClick={toggleShowEditModal} color='info' className='me-2'>Editar</MDBBtn>
                <MDBBtn onClick={() => deleteField(fieldPosition)} color="danger">
                    Eliminar
                </MDBBtn>
                <MDBModal show={addFieldModal} setShow={setEditFieldModal} tabIndex='-1'>
                    <MDBModalDialog size='xl'>
                        <MDBModalContent>
                            <form onSubmit={handleSubmit}>
                                <MDBModalHeader>
                                    <MDBModalTitle>Editar Campo</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={toggleShowEditModal}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>

                                    <MDBRow className='my-4'>
                                        <MDBCol>
                                            <MDBInput
                                                label='Nombre de Campo'
                                                type='text'
                                                id='label'
                                                name='label'
                                                value={label}
                                                onChange={(event) => {
                                                    handleLabelChange(event.target.value)
                                                }}
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className='my-4'>
                                        <MDBCol>
                                            <MDBSelect
                                                label='Tipo de Campo'
                                                data={fieldTypes}
                                                onValueChange={
                                                    (item) => {
                                                        handleFieldTypeChange(item)
                                                    }
                                                }
                                                required
                                            />

                                        </MDBCol>
                                    </MDBRow>

                                    {setupAvailable && setupAvailable.find(e => e == 'required') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol className='text-start'>
                                                <MDBCheckbox
                                                    label='Requerido'
                                                    id='required'
                                                    name='required'
                                                    checked={required}
                                                    onChange={(e) => {
                                                        setRequired(e.target.checked)
                                                    }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'multiple') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol className='text-start'>
                                                <MDBCheckbox
                                                    label='Múltiple'
                                                    id='multiple'
                                                    name='multiple'
                                                    checked={multiple}
                                                    onChange={(e) => setMultiple(e.target.checked)}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'isKPI') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Es indicador'
                                                            id='isKPI'
                                                            name='isKPI'
                                                            checked={isKPI}
                                                            onChange={(e) => setIsKPI(e.target.checked)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasMaxLength') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Longitud Máxima'
                                                            id='hasMaxLength'
                                                            name='hasMaxLength'
                                                            checked={hasMaxLength}
                                                            onChange={(e) => setHasMaxLength(e.target.checked)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasMaxLength && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            <MDBInput
                                                                label='Longitud Máxima'
                                                                type='number'
                                                                id='maxLength'
                                                                name='maxLength'
                                                                onChange={(e) => setMaxLength(e.target.value)}
                                                                value={maxLength}
                                                                required
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasRows') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Filas'
                                                            id='hasRows'
                                                            name='hasRows'
                                                            checked={hasRows}
                                                            onChange={(e) => setHasRows(e.target.checked)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasRows && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            <MDBInput
                                                                label='Cantidad de Filas'
                                                                type='number'
                                                                id='rows'
                                                                name='rows'
                                                                onChange={(e) => setRows(e.target.value)}
                                                                value={rows}
                                                                required
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasMin') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Valor Mínimo'
                                                            id='hasMin'
                                                            name='hasMin'
                                                            checked={hasMin}
                                                            onChange={(e) => setHasMin(e.target.checked)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasMin && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            {
                                                                fieldType == 'number' && (
                                                                    <MDBInput
                                                                        label='Valor Mínimo'
                                                                        type='number'
                                                                        id='min'
                                                                        name='min'
                                                                        value={min}
                                                                        onChange={(e) => setMin(e.target.value)}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'date' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='date'
                                                                        id='min'
                                                                        name='min'
                                                                        value={min}
                                                                        onChange={(e) => setMin(e.target.value)}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'time' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='time'
                                                                        id='min'
                                                                        name='min'
                                                                        value={min}
                                                                        onChange={(e) => setMin(e.target.value)}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'datetime' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='datetime-local'
                                                                        id='min'
                                                                        name='min'
                                                                        value={min}
                                                                        onChange={(e) => setMin(e.target.value)}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasMax') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Valor Máximo'
                                                            id='hasMax'
                                                            name='hasMax'
                                                            onChange={(e) => setHasMax(e.target.checked)}
                                                            checked={hasMax}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasMax && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            {
                                                                fieldType == 'number' && (
                                                                    <MDBInput
                                                                        label='Valor Máximo'
                                                                        type='number'
                                                                        id='max'
                                                                        name='max'
                                                                        onChange={(e) => setMax(e.target.value)}
                                                                        value={max}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'date' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='date'
                                                                        id='max'
                                                                        name='max'
                                                                        onChange={(e) => setMax(e.target.value)}
                                                                        value={max}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'time' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='time'
                                                                        id='max'
                                                                        name='max'
                                                                        onChange={(e) => setMax(e.target.value)}
                                                                        value={max}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                fieldType == 'datetime' && (
                                                                    <MDBInput
                                                                        label=''
                                                                        type='datetime-local'
                                                                        id='max'
                                                                        name='max'
                                                                        onChange={(e) => setMax(e.target.value)}
                                                                        value={max}
                                                                        required
                                                                    />
                                                                )
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasStep') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Paso'
                                                            id='hasStep'
                                                            name='hasStep'
                                                            onChange={(e) => setHasStep(e.target.checked)}
                                                            checked={hasStep}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasStep && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            <MDBInput
                                                                label='Paso'
                                                                type='number'
                                                                id='step'
                                                                name='step'
                                                                onChange={(e) => setStep(e.target.value)}
                                                                value={step}
                                                                required
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasOptions') && (
                                        <>
                                            <MDBRow className='my-4'>
                                                <MDBCol className='text-start'>
                                                    <MDBCheckbox
                                                        label='Tiene valores'
                                                        id='hasValues'
                                                        name='hasValues'
                                                        checked={hasValues}
                                                        onChange={(e) => {
                                                            setHasValues(e.target.checked);
                                                            let data = [...fieldOptionRows];
                                                            if (!e.target.checked) {
                                                                data.forEach((e, index) => {
                                                                    e.value = '';
                                                                })
                                                            }
                                                            setFieldOptionRows(data);
                                                        }}
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='my-4'>
                                                <MDBCol className='text-start'>
                                                    <MDBCheckbox
                                                        label='Tiene puntaje'
                                                        id='hasScores'
                                                        name='hasScores'
                                                        checked={hasScores}
                                                        onChange={(e) => {
                                                            setHasScores(e.target.checked)
                                                            let data = [...fieldOptionRows];
                                                            if (!e.target.checked) {
                                                                data.forEach((e, index) => {
                                                                    e.score = 0;
                                                                })
                                                            }
                                                            setFieldOptionRows(data);
                                                        }}
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='my-4'>
                                                <MDBCol>
                                                    <MDBBtn color='primary' type='button' onClick={handleAddOptionRow}>
                                                        Agregar Opción
                                                    </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='my-4'>
                                                <MDBCol>
                                                    {
                                                        fieldOptionRows.map((option, index) => (
                                                            <MDBRow key={index} className='my-2'>
                                                                <MDBCol>
                                                                    <MDBInput
                                                                        label='Opción'
                                                                        type='text'
                                                                        id={`option${index}`}
                                                                        name={`option${index}`}
                                                                        onChange={(e) => handleOptionChange(e, index)}
                                                                        value={option.option}
                                                                        required
                                                                    />
                                                                </MDBCol>
                                                                {
                                                                    hasValues && (
                                                                        <MDBCol>
                                                                            <MDBInput
                                                                                label='Valor'
                                                                                type='text'
                                                                                id={`value${index}`}
                                                                                name={`value${index}`}
                                                                                onChange={(e) => handleValueChange(e, index)}
                                                                                value={option.value}
                                                                                required
                                                                            />
                                                                        </MDBCol>
                                                                    )
                                                                }
                                                                {
                                                                    hasScores && (
                                                                        <MDBCol>
                                                                            <MDBInput
                                                                                label='Puntaje'
                                                                                type='number'
                                                                                id={`score${index}`}
                                                                                name={`score${index}`}
                                                                                onChange={(e) => handleScoreChange(e, index)}
                                                                                value={option.score}
                                                                                required
                                                                            />
                                                                        </MDBCol>
                                                                    )
                                                                }
                                                                <MDBCol className='text-start'>
                                                                    <MDBBtn color='danger' type='button' onClick={
                                                                        () => handleRemoveOptionRow(index)
                                                                    }>
                                                                        Quitar
                                                                    </MDBBtn>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        ))
                                                    }
                                                </MDBCol>
                                            </MDBRow>
                                        </>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasAccept') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol>
                                                <MDBRow className='my-2'>
                                                    <MDBCol className='text-start'>
                                                        <MDBCheckbox
                                                            label='Tiene Aceptación de Tipo'
                                                            id='hasAccept'
                                                            name='hasAccept'
                                                            checked={hasAccept}
                                                            onChange={(e) => setHasAccept(e.target.checked)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                {hasAccept && (
                                                    <MDBRow className='my-2'>
                                                        <MDBCol>
                                                            <MDBInput
                                                                label='Tipo de Aceptación'
                                                                type='text'
                                                                id='accept'
                                                                name='accept'
                                                                onChange={(e) => setAccept(e.target.value)}
                                                                value={accept}
                                                                placeholder='Ej: .jpg, .png, .pdf'
                                                                required
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                    {setupAvailable && setupAvailable.find(e => e == 'hasValue') && (
                                        <MDBRow className='my-4'>
                                            <MDBCol className='text-start'>
                                                <MDBInput
                                                    label='Valor'
                                                    type='text'
                                                    id='value'
                                                    name='value'
                                                    value={value}
                                                    onChange={(e) => {
                                                        setValue(e.target.value)
                                                    }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    )}

                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' type='button' onClick={toggleShowEditModal}>
                                        Volver
                                    </MDBBtn>
                                    <MDBBtn color='primary' type='submit'>
                                        Guardar
                                    </MDBBtn>
                                </MDBModalFooter>

                            </form>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </MDBCol>
        </MDBRow>
    )
}
