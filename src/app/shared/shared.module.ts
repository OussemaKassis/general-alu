import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    DemoNgZorroAntdModule
  ],
  exports: [
    DemoNgZorroAntdModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
