import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  @ViewChild('titleInputRef') titleInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('tierNameInputRef') tierNameInputRef?: ElementRef<HTMLInputElement>;

  tierlistName = 'Tierlist Name';
  tempTierlistName = 'Tierlist Name';
  isEditingTitle = false;

  tiers = [
    { id: 's', label: 'S', color: '#9775fa' },
    { id: 'a', label: 'A', color: '#4dabf7' },
    { id: 'b', label: 'B', color: '#69db7c' },
    { id: 'c', label: 'C', color: '#ffd43b' },
    { id: 'd', label: 'D', color: '#ffa94d' },
    { id: 'f', label: 'F', color: '#fa5252' },
  ];

  isTierModalOpen = false;
  newTierName = '';

  ngOnInit(): void {
    const nameFromStorage = localStorage.getItem('tierlistName');
    if (nameFromStorage && nameFromStorage.trim()) {
      this.tierlistName = nameFromStorage.trim();
      this.tempTierlistName = this.tierlistName;
    }
  }

  startEditing(): void {
    this.tempTierlistName = this.tierlistName;
    this.isEditingTitle = true;
    setTimeout(() => {
      this.titleInputRef?.nativeElement.focus();
      this.titleInputRef?.nativeElement.select();
    }, 0);
  }

  saveTitle(): void {
    if (!this.isEditingTitle) {
      return;
    }
    const trimmed = this.tempTierlistName.trim();
    if (trimmed) {
      this.tierlistName = trimmed;
      localStorage.setItem('tierlistName', this.tierlistName);
    }
    this.isEditingTitle = false;
  }

  cancelEditing(): void {
    this.tempTierlistName = this.tierlistName;
    this.isEditingTitle = false;
  }

  openAddTierModal(): void {
    this.newTierName = '';
    this.isTierModalOpen = true;
    setTimeout(() => {
      this.tierNameInputRef?.nativeElement.focus();
    }, 0);
  }

  closeTierModal(): void {
    this.isTierModalOpen = false;
  }

  createTier(): void {
    const name = this.newTierName.trim();
    if (!name) {
      return;
    }

    this.tiers.push({
      id: `tier-${this.tiers.length + 1}`,
      label: name,
      color: '#9775fa',
    });
    this.isTierModalOpen = false;
  }
}
