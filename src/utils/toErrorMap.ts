// UTIL converts error arrays to objects

import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};

    errors.forEach(({ field, message }) => {
        // errorMap[error.field] = error.message;
        errorMap[field] = message;
    }); 

    return errorMap;
};