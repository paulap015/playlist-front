import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  playlists: any[] = [];
  playlistsFiltradas: any[] = [];
  playlistSeleccionada: any = null;
  busqueda: string = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.cargarPlaylists();
  }

  cargarPlaylists(): void {
    this.playlistService.list().subscribe(data => {
      this.playlists = data;
      this.playlistsFiltradas = [...this.playlists];
    });
  }

  verDetalles(nombre: string): void {
    this.playlistService.searchById(nombre).subscribe(data => {
      this.playlistSeleccionada = data;
    });
  }

  eliminarPlaylist(nombre: string): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la playlist "${nombre}"?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.playlistService.deleteById(nombre).subscribe(() => {
          Swal.fire(
            'Eliminada',
            `La playlist "${nombre}" ha sido eliminada.`,
            'success'
          );
          this.playlistSeleccionada = null;
          this.cargarPlaylists();
        });
      }
    });
  }


  filtrarPlaylists(): void {
    const filtro = this.busqueda.toLowerCase();
    this.playlistsFiltradas = this.playlists.filter(p =>
      p.nombre.toLowerCase().includes(filtro)
    );
  }

  resetFiltro(): void {
    this.busqueda = '';
    this.playlistsFiltradas = [...this.playlists];
  }
}
