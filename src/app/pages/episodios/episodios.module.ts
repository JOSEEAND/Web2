import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiosRoutingModule } from './episodios-routing.module';
import { EpisodiosComponent } from './episodios.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    EpisodiosComponent
  ],
  imports: [
    CommonModule,
    EpisodiosRoutingModule,
    MaterialModule
  ]
})
export class EpisodiosModule { }
