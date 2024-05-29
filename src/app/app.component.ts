import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'biblioteca-online';

  constructor(private router: Router) {}

  Login() {
    this.router.navigate(['/login']);
  }

  Registro() {
    this.router.navigate(['/registro']);
  }
}
