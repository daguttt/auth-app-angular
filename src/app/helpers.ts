import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

/**
 * This is intended to be used for computing `aria-invalid` input attributes
 * and match PicoCSS input state styles
 */
export function getFormControlStatus(control: FormControl) {
  return control.statusChanges.pipe(
    map((status) => (status === 'INVALID' ? 'true' : ''))
  );
}
