import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { AmountPipe } from './pipes/amount.pipe';

import { PdfService } from './services/pdf.service';

@NgModule({
  declarations: [
    AmountPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    NzLayoutModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    NzTypographyModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzPopconfirmModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzStatisticModule,

    AmountPipe,
  ],
  providers: [
    PdfService,
  ],
})
export class SharedModule { }
