// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [AppComponent],
//     }).compileComponents();
//   });
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   it('should create the app', () => { expect(component).toBeTruthy(); }); it(`should have as title 'registration-form'`, () => { expect(component.title).toEqual('registration-form'); }); it('should render title', () => { const compiled = fixture.nativeElement as HTMLElement; expect(compiled.querySelector('.content span')?.textContent).toContain('registration-form app is running!'); });
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   fixture.detectChanges();
//   //   const compiled = fixture.nativeElement as HTMLElement;
//   //   expect(compiled.querySelector('h1')?.textContent).toContain(
//   //     'Hello, registration-form',
//   //   );
//   // });
// });
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileEditComponent } from './user-profile-edit-component/user-profile-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'User Profile Edit`, () => {
    expect(component.title).toEqual('User Profile Edit');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('user-profile-edit')).toBeTruthy();
  });
});
