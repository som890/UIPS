import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesDialogComponent } from './show-product-images-dialog.component';

describe('ShowProductImagesDialogComponent', () => {
  let component: ShowProductImagesDialogComponent;
  let fixture: ComponentFixture<ShowProductImagesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProductImagesDialogComponent]
    });
    fixture = TestBed.createComponent(ShowProductImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
