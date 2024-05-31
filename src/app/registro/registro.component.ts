import { Component, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../domain/user';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, Credential } from '../services/auth.service';
import { UserService } from '../services/user.service';

interface SignUpForm {
  username: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export type Provider = 'google';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  hide = true;

  user: User = new User();

  formBuilder = inject(FormBuilder);

  form: FormGroup<SignUpForm> = this.formBuilder.group({
    username: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    firstName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'Este campo es requerido'
        : 'Introduzca un correo válido';
    }

    return false;
  }

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this.authService.signUpWithEmailAndPassword(credential);
      alert("Inició sesión exitosamente 😀");
      console.log('Registro Completado', this.user);
      this.userService.addUser(this.user);
      this.router.navigateByUrl('/login');

    } catch (error) {
      console.error(error);

    }
  }

  providerAction(provider: Provider): void {
    if (provider === 'google') {
      this.signUpWithGoogle();
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const result = await this.authService.signInWithGoogleProvider();
      console.log(result);
      this.user.user = result.user.displayName || ''
      this.user.nombre = result.user.displayName || ''
      this.user.apellido = result.user.displayName || ''
      this.user.correo = result.user.email || ''
      this.user.passwo = result.user.tenantId || ''
      this.user.foto = result.user.photoURL || ''
      this.userService.addUser(this.user);
      this.router.navigateByUrl('/login')
    } catch (error) {
      console.log(error);
    }
  }

  volver() {
    this.router.navigate(['/inicio']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
