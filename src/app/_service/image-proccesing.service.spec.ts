import { TestBed } from '@angular/core/testing';

import { ImageProccesingService } from './image-proccesing.service';

describe('ImageProccesingService', () => {
  let service: ImageProccesingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProccesingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
