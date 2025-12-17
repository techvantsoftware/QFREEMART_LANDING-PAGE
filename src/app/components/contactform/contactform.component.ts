import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.css'
})
export class ContactformComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  public sendEmail() {
    // 1. Mark all fields as touched to trigger validation errors if empty
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return; 
    }

    const formValues = this.contactForm.value;

    // 2. Corrected Email Address (Removed the extra 'l' in gmail)
    const recipientEmail = 'vaishnaviitape9005@gmail.com'; 

    // 3. Construct the email content safely
    const subject = encodeURIComponent(formValues.subject);
    const fullName = `${formValues.firstName} ${formValues.lastName}`;
    
    // Formatting the body with new lines (%0D%0A is the code for new line in mailto)
    const body = encodeURIComponent(
      `Name: ${fullName}\n` +
      `Email Request from Website\n\n` +
      `Message:\n${formValues.message}`
    );

    // 4. Create the mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // 5. Open the email client
    // We use window.open usually to prevent current page navigation issues
    window.location.href = mailtoLink;
    
    // Optional: Reset form
    this.contactForm.reset();
  }
}