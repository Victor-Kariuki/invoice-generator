import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PdfService } from './shared/services/pdf.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: PdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PdfService] });
    component = new AppComponent(service);
    service = new PdfService();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addLineItem', () => {
    it('should add a new line item', () => {
      expect(component.invoice.lineItems.length).toBe(1);
      component.addLineItem();
      expect(component.invoice.lineItems.length).toBe(2);
    });
  });

  describe('removeLineItem', () => {
    it('should remove a line item', () => {
      expect(component.invoice.lineItems.length).toBe(2);
      component.removeLineItem(1);
      expect(component.invoice.lineItems.length).toBe(1);
    });
  });

  describe('getSubTotal', () => {
    it('should return the subtotal', () => {
      component.invoice.lineItems = [
        { item: '', quantity: 2, pricePerUnit: 10, amount: 20 },
        { item: '', quantity: 3, pricePerUnit: 5, amount: 15 }
      ];
      component.getSubTotal();
      expect(component.invoice.subTotal).toBe(35);
    });
  });

  describe('getAmount', () => {
    it('should return the line item amount', () => {
      component.invoice.lineItems = [
        { item: '', quantity: 2, pricePerUnit: 10, amount: 20 },
        { item: '', quantity: 3, pricePerUnit: 5, amount: 15 }
      ];
      component.getAmount(0);
      expect(component.invoice.lineItems[0].amount).toBe(20);
    });
  });

  describe('getTotal', () => {
    it('should return the total', () => {
      component.invoice.subTotal = 35;
      component.invoice.tax = 0;
      component.invoice.fee = 10;
      component.getTotal();
      expect(component.invoice.total).toBe(45);
    });
  });

  describe('getDocumentDefinitions', () => {
    it('should return the document definitions', () => {
      expect(component.getDocumentDefinitions()).toBeTruthy();
    });
  });

  describe('openPdf', () => {
    it('should open the pdf', () => {
      spyOn(service, 'openPdf');
      component.openPdf();
      expect(service.openPdf).toHaveBeenCalled();
    });
  });

  describe('printPdf', () => {
    it('should print the pdf', () => {
      spyOn(service, 'printPdf');
      component.printPdf();
      expect(service.printPdf).toHaveBeenCalled();
    });
  });

  describe('downloadPdf', () => {
    it('should download the pdf', () => {
      spyOn(service, 'downloadPdf');
      component.downloadPdf();
      expect(service.downloadPdf).toHaveBeenCalled();
    });
  });
});
