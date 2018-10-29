import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value; // to get value in input tag
        console.log('password :' , password);
        const confirmed_password = AC.get('confirmed_password').value; // to get value in input tag
        console.log('confirmed_password :' , confirmed_password);
        if (password !== confirmed_password) {
            console.log('false');
            AC.get('confirmed_password').setErrors({ MatchPassword: true });
        } else {
            console.log('true');
            return null;
        }
    }
}