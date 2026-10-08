import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
