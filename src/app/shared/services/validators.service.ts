import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class ValidatorsService {
  public equalValidator(control: FormGroup): ValidationErrors | null {
    const { password, cpassword } = control.value;
    return password !== cpassword ? { isError: true } : null;
  }

}
