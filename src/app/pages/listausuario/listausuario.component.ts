import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../domain/user';
import { Router } from '@angular/router';
import { IconEdit } from '../../icons/edit';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, IconEdit, AsyncPipe, HeaderComponent],
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.scss']
})
export class listausuario implements OnInit {

  users: any[] = []
  buscateste: string = ''

  constructor(private userservices: UserService, private router: Router) { }

  ngOnInit() {
    this.userservices.getUsers().then(data => {

      this.users = data.docs.map((doc: any) => {
        console.log(doc.id)
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      console.log('Users', this.users)
    })
  }

  async changeQuery() {
    console.log(this.buscateste)
    try {
      await this.userservices.searchUserByQuery(this.buscateste).then(data => {

        this.users = data.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        console.log('usuarios', this.users)
      });
    } catch (error) {
      console.error(error)
    }
  }
  editUser(user: User) {
    this.router.navigate(['/edituseradmin', user.id]);
  }

  volver() {
    this.router.navigate(['/biblioteca']);
  }
}
