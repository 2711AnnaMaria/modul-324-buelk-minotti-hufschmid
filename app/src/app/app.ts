import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  isModalOpen = false;
  tierlistName = '';

  get isEditorView(): boolean {
    return this.router.url.startsWith('/editor');
  }

  goBack(): void {
    this.location.back();
  }

  openCreateModal(): void {

    this.tierlistName = '';
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createTierlist(): void {
    const name = this.tierlistName.trim();
    if (!name) {
      return;
    }
    this.isModalOpen = false;
    localStorage.setItem('tierlistName', name);
    this.router.navigate(['/editor']);
  }
}

