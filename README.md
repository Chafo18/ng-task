# UserProfileEditComponent

## Overview
The `UserProfileEditComponent` is an Angular component that allows users to edit their profile information. The form includes fields for first name, last name, email, phone number, and profile picture. The component also includes form validation, data pre-population, API integration, and profile picture upload functionality.

## Features
- Form with fields for first name, last name, email, phone number, and profile picture.
- Basic form validation.
- Data pre-population with user's current profile data.
- API integration for updating user profile.
- Profile picture upload with preview.
- UI/UX enhancements using a UI framework or custom CSS.
- Routing to access the component via `/edit-profile` route.
- Unit tests for form validation, submission, and error handling.

## Form Fields
- **First Name** (text): Required.
- **Last Name** (text): Required.
- **Email** (email): Required and should be a valid email format.
- **Phone Number** (optional, text): Should accept only numbers.
- **Profile Picture** (optional, file upload): Allows users to upload a profile picture.

## Form Validation
- **First and Last Name**: Required.
- **Email**: Required and should be a valid email format.
- **Phone Number**: Should accept only numbers and should be optional.
- Appropriate error messages are displayed if validation fails.

## Data Pre-Population
- The form is pre-populated with the user's current profile data.
- The profile data can be fetched from a mock service or API endpoint.
- The profile data is editable, allowing the user to modify and submit it.

## API Integration
- The form is integrated with a mock API using Angular’s HttpClient.
- On form submission, a PUT or PATCH request is sent to update the user profile.
- Success and error notifications are displayed based on the API response.

## Profile Picture Upload
- File upload functionality is implemented for the profile picture.
- If a new profile picture is uploaded, it is sent along with the user profile update request.
- The picture is previewed before submission.

## UI/UX
- A UI framework of your choice (such as Angular Material, Bootstrap, or TailwindCSS) can be used to style the form, or you can create everything from scratch with custom CSS.
- The form includes a "Save" button and a "Cancel" button.
- A loading spinner is displayed while the form is being submitted.

## Routing
- The `UserProfileEditComponent` is accessible via the `/edit-profile` route.

## Testing
- 10/10
- Unit tests are written to validate that the form works correctly.
  - Tests for correct pre-population of form fields.
  - Tests for successful form submission.
  - Tests for error handling and validation.

