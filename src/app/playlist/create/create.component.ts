import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
playlistForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      canciones: this.fb.array([this.createCancionGroup()]) // una canción por defecto
    });
  }

  get canciones(): FormArray {
    return this.playlistForm.get('canciones') as FormArray;
  }

  createCancionGroup(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      album: [''],
      anno: ['', Validators.required],
      genero: ['']
    });
  }

  agregarCancion(): void {
    this.canciones.push(this.createCancionGroup());
  }

  eliminarCancion(index: number): void {
    if (this.canciones.length > 1) {
      this.canciones.removeAt(index);
    }
  }

  crearPlaylist(): void {
  if (this.playlistForm.valid) {
    this.playlistService.create(this.playlistForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Playlist creada!',
          text: 'Tu playlist se ha guardado correctamente',
          confirmButtonColor: '#198754' 
        });

        this.playlistForm.reset();
        this.canciones.clear();
        this.agregarCancion();
      },
      error: (error) => {
        console.error('Error al crear playlist:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar la playlist. Intenta nuevamente.',
          confirmButtonColor: '#dc3545' 
        });
      }
    });
  } else {
    this.playlistForm.markAllAsTouched();
  }
}

}
