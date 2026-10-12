import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    localStorage.removeItem('tierlistName');
    localStorage.removeItem('tierlistItems');
    await TestBed.configureTestingModule({
      imports: [EditorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('tierlistName');
    localStorage.removeItem('tierlistItems');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should persist a trimmed item name and its selected color', () => {
    component.openAddItemModal();
    component.newItemName = '  Kuchen  ';
    component.newItemColor = '#123456';
    component.createItem();

    expect(component.items).toHaveLength(1);
    expect(component.items[0]).toMatchObject({
      name: 'Kuchen',
      color: '#123456',
      imageUrl: null,
    });
    expect(JSON.parse(localStorage.getItem('tierlistItems')!)).toEqual(component.items);
    expect(component.isItemModalOpen).toBe(false);

    const restored = TestBed.createComponent(EditorComponent);
    restored.detectChanges();
    expect(restored.componentInstance.items).toEqual(component.items);
  });

  it('should not create an item with a blank name', () => {
    component.openAddItemModal();
    component.newItemName = '   ';
    component.createItem();

    expect(component.items).toHaveLength(0);
    expect(localStorage.getItem('tierlistItems')).toBeNull();
    expect(component.isItemModalOpen).toBe(true);
  });

  it('should assign a valid random color when no color is selected', () => {
    component.newItemName = 'Kuchen';
    component.createItem();

    expect(component.items[0].color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it.each(['invalid json', 'null', '{}', '[null]'])(
    'should ignore invalid stored items: %s',
    storedItems => {
      localStorage.setItem('tierlistItems', storedItems);
      const restored = TestBed.createComponent(EditorComponent);
      restored.detectChanges();
      expect(restored.componentInstance.items).toEqual([]);
    },
  );

  it('should add a named tier at the end of the board', () => {
    component.openAddTierModal();
    component.newTierName = 'Extras';
    component.createTier();
    const changeDetector = fixture.debugElement.injector.get(ChangeDetectorRef);
    changeDetector.detectChanges();

    expect(component.tiers).toHaveLength(7);
    expect(component.tiers[6].label).toBe('Extras');
    expect(component.isTierModalOpen).toBe(false);
    const labels: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.tier-label');
    expect(labels).toHaveLength(7);
    expect(labels[6].textContent).toBe('Extras');
  });

  it('should not create a tier without a name', () => {
    component.openAddTierModal();
    component.newTierName = '   ';
    component.createTier();

    expect(component.tiers).toHaveLength(6);
    expect(component.isTierModalOpen).toBe(true);
  });

  it('should keep the tiers unchanged when creation is cancelled', () => {
    component.openAddTierModal();
    component.newTierName = 'Extras';
    component.closeTierModal();

    expect(component.tiers).toHaveLength(6);
    expect(component.isTierModalOpen).toBe(false);

    component.openAddTierModal();
    expect(component.newTierName).toBe('');
  });

  it('should give each new tier its own id even when the names are equal', () => {
    component.newTierName = 'Extras';
    component.createTier();
    component.newTierName = 'Extras';
    component.createTier();

    expect(component.tiers).toHaveLength(8);
    expect(new Set(component.tiers.map(tier => tier.id)).size).toBe(8);
  });
});
