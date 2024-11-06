import { FormControl } from '@angular/forms';

export interface User {
  id: FormControl<number | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<number | null>;
  img: FormControl<string | null>;
}
