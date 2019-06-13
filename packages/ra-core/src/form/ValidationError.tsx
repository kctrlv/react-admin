import React, { SFC } from 'react';
import { ValidationError, ValidationErrorMessage } from './validate';
import { useTranslate } from '../i18n';

interface Props {
    error: ValidationError;
};

const Error: SFC<Props> = ({ error }) => {
    const translate = useTranslate();

    if ((error as ValidationErrorMessage).message) {
        const errorMessage = error as ValidationErrorMessage;

        const translatedArgs = Object
            .keys(errorMessage.args)
            .reduce((acc, key) => ({ ...acc, [key]: translate(key) }), {});

        return <>{translate(errorMessage.message, translatedArgs)}</>;
    } 
    
    return <>{translate(error as string)}</>;
};

export default Error;