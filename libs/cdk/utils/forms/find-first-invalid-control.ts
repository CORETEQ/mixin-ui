import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function findFirstInvalidControl(control: AbstractControl): AbstractControl | null {
  if (control.valid) {
    return null;
  }

  if (control instanceof FormGroup) {
    for (const key of Object.keys(control.controls)) {
      const invalid = findFirstInvalidControl(control.controls[key]);
      if (invalid) {
        return invalid;
      }
    }
    return null;
  }

  if (control instanceof FormArray) {
    for (const childControl of control.controls) {
      const invalid = findFirstInvalidControl(childControl);
      if (invalid) {
        return invalid;
      }
    }
    return null;
  }

  return control;
}
