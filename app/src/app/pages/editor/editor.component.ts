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

  tiers = [
    { id: 's', label: 'S', color: '#9775fa' },
    { id: 'a', label: 'A', color: '#4dabf7' },
    { id: 'b', label: 'B', color: '#69db7c' },
    { id: 'c', label: 'C', color: '#ffd43b' },
    { id: 'd', label: 'D', color: '#ffa94d' },
    { id: 'f', label: 'F', color: '#fa5252' },
  ];

  items: { id: string; name: string; color: string; imageUrl: string | null }[] = [];

  isItemModalOpen = false;
  newItemName = '';
  newItemColor = '';
  newItemImageDataUrl: string | null = null;
  newItemImageName: string | null = null;

  ngOnInit(): void {
    const nameFromStorage = localStorage.getItem('tierlistName');
    if (nameFromStorage && nameFromStorage.trim()) {
      this.tierlistName = nameFromStorage.trim();
      this.tempTierlistName = this.tierlistName;
    }

    const itemsFromStorage = localStorage.getItem('tierlistItems');
    if (itemsFromStorage) {
      try {
        this.items = JSON.parse(itemsFromStorage);
      } catch {
        this.items = [];
      }
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

  openAddItemModal(): void {
    this.newItemName = '';
    this.newItemColor = '';
    this.newItemImageDataUrl = null;
    this.newItemImageName = null;
    this.isItemModalOpen = true;
  }

  closeItemModal(): void {
    this.isItemModalOpen = false;
  }

  onItemImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.newItemImageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.newItemImageDataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createItem(): void {
    const name = this.newItemName.trim();
    if (!name) {
      return;
    }
    this.items.push({
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      color: this.newItemColor || this.randomItemColor(),
      imageUrl: this.newItemImageDataUrl,
    });
    localStorage.setItem('tierlistItems', JSON.stringify(this.items));
    this.isItemModalOpen = false;
  }

  private randomItemColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 65 + Math.random() * 20;
    const lightness = 55 + Math.random() * 15;
    return this.hslToHex(hue, saturation, lightness);
  }

  private hslToHex(hue: number, saturation: number, lightness: number): string {
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;

    let r: number;
    let g: number;
    let b: number;

    if (hue < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hue < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hue < 180) {
      [r, g, b] = [0, c, x];
    } else if (hue < 240) {
      [r, g, b] = [0, x, c];
    } else if (hue < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }

    const toHex = (value: number) =>
      Math.round((value + m) * 255)
        .toString(16)
        .padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  getItemTextColor(color: string): string {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.55 ? '#ffffff' : '#1b1020';
  }
}
