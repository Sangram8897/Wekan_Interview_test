const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

export type FormState = {
    inputValues: {
        title: string;
        description: string;
        due_date: string | null;
        status: string | null; // Adjust the type based on your actual implementation
    };
    inputValidities: {
        title: boolean;
        description: boolean;
        due_date: boolean;
        status: boolean;
    };
    formIsValid: boolean;
};

export interface FormAction<T = any> {
    type: string;
    input: string;
    value: T;
    isValid: boolean;
}

export const formReducer = (state: FormState, action: FormAction) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues: Record<string, any> = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        // for (const key in updatedValidities) {
        //     updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        // }
        for (const key in updatedValidities) {
            if (Object.prototype.hasOwnProperty.call(updatedValidities, key)) {
                // Use type assertion to tell TypeScript that the key does exist in the object
                updatedFormIsValid = updatedFormIsValid && (updatedValidities as Record<string, boolean>)[key];
            }
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state;
}
