import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";  

import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Service File
@Injectable()
export class PdfService {
  downloadPdf(documentDefinitions: TDocumentDefinitions) {
    pdfMake.createPdf(documentDefinitions, undefined, {
      Poppins: {
        normal: `${window.location.origin}/assets/fonts/Poppins-Regular.ttf`,
        bold: `${window.location.origin}/assets/fonts/Poppins-Bold.ttf`,
        italics: `${window.location.origin}/assets/fonts/Poppins-Italic.ttf`,
      }
    }, pdfFonts.pdfMake.vfs).download();
  }

  printPdf(documentDefinitions: TDocumentDefinitions) {
    pdfMake.createPdf(documentDefinitions, undefined, {
      Poppins: {
        normal: `${window.location.origin}/assets/fonts/Poppins-Regular.ttf`,
        bold: `${window.location.origin}/assets/fonts/Poppins-Bold.ttf`,
        italics: `${window.location.origin}/assets/fonts/Poppins-Italic.ttf`,
      }
    }, pdfFonts.pdfMake.vfs).print();
  }

  openPdf(documentDefinitions: TDocumentDefinitions) {
    pdfMake.createPdf(documentDefinitions, undefined, {
      Poppins: {
        normal: `${window.location.origin}/assets/fonts/Poppins-Regular.ttf`,
        bold: `${window.location.origin}/assets/fonts/Poppins-Bold.ttf`,
        italics: `${window.location.origin}/assets/fonts/Poppins-Italic.ttf`,
      }
    }, pdfFonts.pdfMake.vfs).open();
  }
}