import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidatesDetailComponent } from './candidates/candidates-detail/candidates-detail.component';
import { CandidatesListComponent } from './candidates/candidates-list/candidates-list.component';
import { CandidatesItemComponent } from './candidates/candidates-list/candidates-item/candidates-item.component';
import { CandidateEditComponent } from './candidates/candidate-edit/candidate-edit.component';
import { CandidateStartComponent } from './candidates/candidate-start/candidate-start.component';
import { CandidateService } from './candidates/candidate.service';
import { DataStorageService } from './candidates/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CandidatesComponent,
    CandidatesDetailComponent,
    CandidatesListComponent,
    CandidatesItemComponent,
    CandidateEditComponent,
    CandidateStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpModule

  ],
  providers: [CandidateService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
