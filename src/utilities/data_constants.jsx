/**
 * @fileoverview This file contains all the constants used in the application.
 */

/**
 * Constant that sets all the field types
 */

const FIELD_TYPE_CONST = {
    TEXT: "text",
    TEXTAREA: "textarea",
    NUMBER: "number",
    DATE: "date",
    TIME: "time",
    DATETIME: "datetime",
    SELECT: "select",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    FILE: "file",
    EMAIL: "email",
    URL: "url",
    PASSWORD: "password",
    HIDDEN: "hidden",
    TITLE: "title",
};

/**
 * Object that holds the properties of each field type
 */

const FIELD_TYPES = {
    text: {
        fieldType: FIELD_TYPE_CONST.TEXT,
        fieldName: "Texto",
        setupAvailable: [
            "required",
            "hasMaxLength"
        ]
    },
    textarea: {
        fieldType: FIELD_TYPE_CONST.TEXTAREA,
        fieldName: "Area de Texto",
        setupAvailable: [
            "required",
            "hasMaxLength",
            "hasRows"
        ]
    },
    number: {
        fieldType: FIELD_TYPE_CONST.NUMBER,
        fieldName: "Número",
        setupAvailable: [
            "required",
            "hasMin",
            "hasMax",
            "hasStep",
            "isKPI"
        ]
    },
    date: {
        fieldType: FIELD_TYPE_CONST.DATE,
        fieldName: "Fecha",
        setupAvailable: [
            "required",
            "hasMin",
            "hasMax"
        ]
    },
    time: {
        fieldType: FIELD_TYPE_CONST.TIME,
        fieldName: "Hora",
        setupAvailable: [
            "required",
            "hasMin",
            "hasMax"
        ]
    },
    datetime: {
        fieldType: FIELD_TYPE_CONST.DATETIME,
        fieldName: "Fecha y Hora",
        setupAvailable: [
            "required",
            "hasMin",
            "hasMax"
        ]
    },
    select: {
        fieldType: FIELD_TYPE_CONST.SELECT,
        fieldName: "Dropdown",
        setupAvailable: [
            "required",
            "multiple",
            "hasOptions",
            "hasValues",
            "hasScores",
            "isKPI"
        ]
    },
    checkbox: {
        fieldType: FIELD_TYPE_CONST.CHECKBOX,
        fieldName: "Checkbox",
        setupAvailable: [
            "required",
            "hasOptions",
            "hasValues",
            "hasScores",
            "isKPI"
        ]
    },
    radio: {
        fieldType: FIELD_TYPE_CONST.RADIO,
        fieldName: "Radio",
        setupAvailable: [
            "required",
            "hasOptions",
            "hasValues",
            "hasScores",
            "isKPI"
        ]
    },
    file: {
        fieldType: FIELD_TYPE_CONST.FILE,
        fieldName: "Fichero",
        setupAvailable: [
            "required",
            "multiple",
            "hasAccept"
        ]
    },
    email: {
        fieldType: FIELD_TYPE_CONST.EMAIL,
        fieldName: "Email",
        setupAvailable: [
            "required",
            "hasMaxLength"
        ]
    },
    url: {
        fieldType: FIELD_TYPE_CONST.URL,
        fieldName: "URL",
        setupAvailable: [
            "required",
            "hasMaxLength"
        ]
    },
    password: {
        fieldType: FIELD_TYPE_CONST.PASSWORD,
        fieldName: "Password",
        setupAvailable: [
            "required",
            "hasMaxLength"
        ]
    },
    hidden: {
        fieldType: FIELD_TYPE_CONST.HIDDEN,
        fieldName: "Oculto",
        setupAvailable: [
            "hasValue"
        ]
    },
    title: {
        fieldType: FIELD_TYPE_CONST.TITLE,
        fieldName: "Título",
        setupAvailable: [
            "hasValue"
        ]
    },
};

export { FIELD_TYPE_CONST, FIELD_TYPES };