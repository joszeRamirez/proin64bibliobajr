import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listausuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.usuarios = users;
    });
  }
}