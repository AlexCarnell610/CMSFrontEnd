import { FormControl, ValidatorFn } from "@angular/forms";

export function yes(){
    return "ok";
}

export const selectValidator: ValidatorFn = (control: FormControl) => {
    if (control.value !== 'invalid') {
        console.error("VALIDATOR VALID");
        
        return null;
    } else {
        console.error("VALIDATOR INVALID");
        return {
            select: "Select a value"
        }
    }
}