import { Component, EventEmitter, Output, computed, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  @Output() changeQuery = new EventEmitter<string>();

  control = new FormControl('');

  query = toSignal(
    this.control.valueChanges.pipe(debounceTime(500), distinctUntilChanged()),
  );

  newQuery = computed(() => this.query());

  constructor() {
    effect(() => {
      this.changeQuery.emit(this.newQuery()!);
    });
  }
}
