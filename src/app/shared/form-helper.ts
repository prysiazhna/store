import { FormGroup } from '@angular/forms';
export abstract class AbstractForm {
  public form: FormGroup;

  public getField(name) {
    return this.form.get(name);
  }
}
