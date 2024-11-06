import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { UserService } from '../editUserProfile.service';
import { of, throwError } from 'rxjs';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        UserProfileEditComponent,
      ],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pre-populate the form with user data', () => {
    const mockUserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      img: '',
    };

    spyOn(userService, 'getUser').and.returnValue(of(mockUserData));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value).toEqual(mockUserData);
  });

  it('should display error messages for invalid form fields', () => {
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['email'].setValue('invalid-email');
    component.form.controls['phoneNumber'].setValue('invalid-phone');

    component.form.controls['firstName'].markAsTouched();
    component.form.controls['lastName'].markAsTouched();
    component.form.controls['email'].markAsTouched();
    component.form.controls['phoneNumber'].markAsTouched();

    fixture.detectChanges();

    const firstNameError = fixture.nativeElement.querySelector(
      '#firstName + div.text-red-500',
    );
    const lastNameError = fixture.nativeElement.querySelector(
      '#lastName + div.text-red-500',
    );
    const emailError = fixture.nativeElement.querySelector(
      '#email + div.text-red-500',
    );
    const phoneNumberError = fixture.nativeElement.querySelector(
      '#phoneNumber + div.text-red-500',
    );

    expect(firstNameError).toBeTruthy();
    expect(lastNameError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(phoneNumberError).toBeTruthy();
  });

  it('should submit the form successfully', fakeAsync(() => {
    const mockUserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      img: '',
    };

    const updateUserSpy = spyOn(userService, 'updateUser').and.returnValue(
      of(mockUserData),
    );

    component.form.setValue(mockUserData);
    component.submit();

    tick(2000);
    flush();
    expect(updateUserSpy).toHaveBeenCalledWith(mockUserData);
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle form submission error', () => {
    const mockUserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      img: '',
    };

    spyOn(userService, 'updateUser').and.returnValue(throwError('Error'));
    component.form.setValue(mockUserData);
    component.submit();

    expect(userService.updateUser).toHaveBeenCalledWith(mockUserData);
    expect(component.isLoading).toBeFalse();
    expect(component.isUpdated).toBeFalse();
  });

  it('should handle file input change', () => {
    const file = new Blob(['file content'], { type: 'image/png' });
    const event = { target: { files: [file] } };

    spyOn(window, 'FileReader').and.returnValue({
      readAsDataURL: () => {},
      onload: () => {
        component.onFileChange(event);
        expect(component.form.controls['img'].value).toContain(
          'data:image/png;base64',
        );
      },
    } as any);

    component.onFileChange(event);
  });

  it('should reset the form on cancel', fakeAsync(() => {
    component.form.setValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      img: '',
    });

    component.cancel();
    
    expect(component.form.value.firstName).toBe('');
    expect(component.form.value.lastName).toBe('');
    expect(component.form.value.email).toBe('');
    expect(component.form.value.phoneNumber).toBeNull();
    expect(component.form.value.img).toBeNull();
  }));
});
