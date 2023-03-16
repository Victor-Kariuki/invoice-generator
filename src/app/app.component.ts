import { Component, OnInit } from '@angular/core';

import { format } from "date-fns";

import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { PdfService } from './shared/services/pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  constructor(private pdfService: PdfService) { }

  year = new Date().getFullYear();

  invoice: IInvoice = {
    invoice_number: "",
    seller: {
      name: "",
      address: "",
      phoneNumber: null,
      email: ""
    },
    buyer: {
      name: "",
      address: "",
      phoneNumber: null,
      email: ""
    },
    invoice_date: "",
    payment_due: "",
    lineItems: [],
    subTotal: 0,
    tax: 0,
    fee: 0,
    total: 0,
    termsAndConditions: ""
  }

  formatterPercent = (value: number): string => `% ${value}`

  formatterKSH = (value: number): string => new Intl.NumberFormat('en-us', {
    style: "currency",
    currency: 'KSH'
  }).format(value).toString();

  addLineItem(): void {
    this.invoice.lineItems.push({ item: '', quantity: 0, pricePerUnit: 0, amount: 0 });
  }

  removeLineItem(lineItemIndex: number): void {
    if (lineItemIndex === 0) {
      this.invoice.lineItems.shift();
    }
    this.invoice.lineItems.splice(lineItemIndex, 1);
  }


  getSubTotal(): void {
    this.invoice.subTotal = this.invoice.lineItems
      .map(({ amount }) => amount)
      .reduce((previousAmount, currentAmount) => previousAmount + currentAmount);
  }

  getAmount(lineItemIndex: number): void {
    this.invoice.lineItems[lineItemIndex].amount = this.invoice.lineItems[lineItemIndex].pricePerUnit * this.invoice.lineItems[lineItemIndex].quantity
    this.getSubTotal();
    this.getTotal();
  }

  getTotal(): void {
    this.invoice.total = (this.invoice.subTotal + this.invoice.fee) * ((100 - this.invoice.tax)/100)
  }

  getDocumentDefinitions = (): TDocumentDefinitions => {
    return {
      pageOrientation: 'portrait',    
      content: [
        {text: 'INVOICE', headlineLevel: 1, bold: true, fontSize: 24 },
        {
          margin: [0, 24, 0, 24],
          columns: [
            {
              text: [
                { text: `${this.invoice.seller.name} \n`},
                `${this.invoice.seller.address} \n`,
                `${this.invoice.seller.phoneNumber} \n`,
                `${this.invoice.seller.email} \n`,
              ],
            },
          ],
        },
        {
          margin: [0, 24, 0, 24],
          columns: [
            {
              text: [
                { text: 'Bill To: \n', bold: true },
                `${this.invoice.buyer.name} \n`,
                `${this.invoice.buyer.address} \n`,
                `${this.invoice.buyer.phoneNumber} \n`,
                `${this.invoice.buyer.email} \n`,
              ]
            },
            {
              text: [
                { text: 'Invoice Number: ', bold: true },
                { text: `${this.invoice.invoice_number} \n` },
      
                { text: 'Invoice Date: ', bold: true },
                { text: `${format(new Date(this.invoice.invoice_date), "MM/dd/yyyy")} \n` },
  
                { text: 'Payment Due: ', bold: true },
                { text: `${format(new Date(this.invoice.payment_due), "MM/dd/yyyy")} \n` },
              ],
            },
          ],
        },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [
                { text: 'Item', style: 'tableHeader' }, 
                { text: 'Quantity', style: 'tableHeader' }, 
                { text: 'Price Per Unit', style: 'tableHeader' }, 
                { text: 'Amount', style: 'tableHeader' }, 
              ],
              ...this.invoice.lineItems.map((lineItem) => Object.values(lineItem)),
            ],
          },
          margin: [0, 24, 0, 24],
          layout: {
            hLineWidth: function () {
                return 1;
            },
            vLineWidth: function () {
                return 0;
            },
            hLineColor: function () {
                return 'black';
            },
            vLineColor: function () {
                return 'black';
            }
          }
        },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              ['', '', { text: 'Subtotal', style: 'subTotal' }, this.invoice.subTotal],
              ['', '', { text: 'Tax 0.00%', style: 'subTotal' }, this.invoice.tax],
              ['', '', { text: 'Fees/Discounts', style: 'subTotal' }, this.invoice.fee],
              [
                '', 
                '', 
                { text: 'TOTAL', style: 'total' }, 
                { text: this.invoice.total, style: 'totalValue'}
              ],
            ],
          },
          margin: [0, 24, 0, 24],
          layout: 'noBorders'
        },
        {
          text: [
            { text: 'Terms and conditions \n', bold: true },
            { text: this.invoice.termsAndConditions, italics: true },
          ],
        },
      ],
      defaultStyle: {
        fontSize: 10,
        font: 'Poppins'
      },
      styles: {
        tableHeader: {
          bold: true,
          color: 'black',
          fillColor: '#FFE7D2',
        },
        subTotal: {
          bold: true,
          alignment: 'center'
        },
        total: {
          bold: true,
          color: 'black',
          alignment: 'center',
          fillColor: '#FFE7D2',
          fontSize: 12
        },
        totalValue: {
          bold: true,
          color: 'black',
          fillColor: '#FFE7D2',
          fontSize: 12
        },
      }, 
    }
  }



  openPdf = (): void => {
    this.pdfService.openPdf(this.getDocumentDefinitions());
  }

  printPdf = (): void => {
    this.pdfService.printPdf(this.getDocumentDefinitions());
  }

  downloadPdf = (): void => {
    this.pdfService.downloadPdf(this.getDocumentDefinitions());
  }

  ngOnInit(): void {
    this.addLineItem();
  }
}
