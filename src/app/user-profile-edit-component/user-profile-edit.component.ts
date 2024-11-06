import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../model';
import { CommonModule } from '@angular/common';
import { delay, of } from 'rxjs';
import { UserService } from '../editUserProfile.service';

@Component({
  selector: 'user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class UserProfileEditComponent {
  setNotUpdatedFlag() {
    this.isNotUpdated = true;
    setTimeout(() => {
      this.isNotUpdated = false;
    }, 2000);
  }
  private userService = inject(UserService);

  form: FormGroup = this.formBuilder();
  isLoading: boolean = false;
  isUpdated: boolean = false;
  isNotUpdated: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;

  private formBuilder() {
    return new FormGroup<User>({
      id: new FormControl(null),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
      img: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.formBuilder();
    this.userService.getUser().subscribe(
      (data: User) => {
        this.form.setValue(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
      },
    );
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
  submit(): void {
    this.isLoading = true;
    this.isUpdated = false;
    this.userService
      .updateUser(this.form.value)
      .pipe(delay(2000))
      .subscribe(
        (response) => {
          this.imageUrl = null;
          this.form.reset();
          this.isLoading = false;
          this.isUpdated = true;
          setTimeout(() => {
            this.isUpdated = false;
          }, 2000);
        },
        (error) => {
          console.error('Error updating user:', error);
          this.isLoading = false;
          setTimeout(() => {
            this.isNotUpdated = true;
          }, 500);
        },
      );
  }

  cancel(): void {
    this.form.reset({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: null,
      img: null,
    });
  }
}
