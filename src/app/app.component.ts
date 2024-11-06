import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit-component/user-profile-edit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'User Profile Edit';
}
