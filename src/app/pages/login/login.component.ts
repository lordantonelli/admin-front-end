import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  errorMessage: string = '';

  ngOnInit() {
    this.form.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => (this.errorMessage = ''));
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email as string, password as string).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (resp) => {
          this.errorMessage = resp.error.message;
        },
      });
    } else {
      this.errorMessage = 'Há campos inválidos no formulário!';
    }
  }
}
