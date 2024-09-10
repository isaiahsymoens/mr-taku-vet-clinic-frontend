import {toCamelCase} from "./caseUtils";

export interface GenericErrorResponse {
    [key: string]: string;
}

export const extractErrorMessages = (apiErrors: GenericErrorResponse): Record<string, string> => {
    const errorMessages: Record<string, string> = {};
    for (const [field, message] of Object.entries(apiErrors)) {
        const camelCaseField = toCamelCase(field);
        errorMessages[camelCaseField] = message;
    }
    return errorMessages;
}

