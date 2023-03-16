
import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a pdf from the data passed to it', () => {
    const data = { content: 'My PDF content' };
    const result = service.downloadPdf(data);
    expect(result).toBeDefined();
  });
});