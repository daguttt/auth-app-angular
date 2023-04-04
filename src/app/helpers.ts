import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

export function getFormControlStatus(control: FormControl) {
  return control.statusChanges.pipe(
    map((status) => (status === 'INVALID' ? 'true' : ''))
  );
}
