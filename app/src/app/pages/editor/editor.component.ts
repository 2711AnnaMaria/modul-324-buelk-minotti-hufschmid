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

  tierlistName = 'Tierlist Name';
  tempTierlistName = 'Tierlist Name';
  isEditingTitle = false;

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
}


