import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from '../../../domain/user';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

export interface CreateForm {
  user: FormControl<string>;
  passwo: FormControl<string>;
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  correo: FormControl<string>;
  celu: FormControl<string>;
  ubica: FormControl<string>;
  foto: FormControl<string>;
  socialUrl: FormControl<string>;
}


@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent {
  private eluserId = ''

  constructor(private router: Router, private userservice: UserService, private formBuilder: NonNullableFormBuilder) { }

  get userId(): string {
    return this.eluserId;
  }

  @Input() set userId(value: string) {
    this.eluserId = value;
    this.setFormValues(this.eluserId);
  }

  form = this.formBuilder.group<CreateForm>({
    user: this.formBuilder.control('', Validators.required),
    passwo: this.formBuilder.control('', Validators.required),
    nombre: this.formBuilder.control('', Validators.required),
    apellido: this.formBuilder.control('', Validators.required),
    correo: this.formBuilder.control('', 
      [Validators.required, Validators.email]),
    celu: this.formBuilder.control('', Validators.min(10)),
    ubica: this.formBuilder.control('', Validators.required),
    foto: this.formBuilder.control(''),
    socialUrl: this.formBuilder.control('')
  });

  volver() {
    this.router.navigate(['/biblioteca']);
  }

  async editUser() {
    if (this.form.invalid) return;

    try {
      const user = this.form.value as User;
      !this.userId
        ? this.userservice.addUser(user)
        : this.userservice.updateUser(this.userId, user);
      this.router.navigate(['/biblioteca']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const user = await this.userservice.getUser(id);
      if (!user) return;
      this.form.setValue({
        user: user.user,
        passwo: user.passwo,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        celu: user.celu,
        ubica: user.ubica,
        foto: user.foto,
        socialUrl: user.socialUrl
      });
    } catch (error) { }
  }
}
