import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // new http
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { GridService } from './services/grid.service';
import { VideoTitleComponent } from './my-grid-application/video-title/video-title.component';
import { ShowImgComponent } from './my-grid-application/show-img-component/show-img-component.component';
import { MatCheckboxComponent } from './my-grid-application/mat-checkbox/mat-checkbox.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateParseComponent } from './my-grid-application/date-parse/date-parse.component';
import { YoutubePlayerComponent } from './services/youtube-player/youtube-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent,
    VideoTitleComponent,
    ShowImgComponent,
    MatCheckboxComponent,
    DateParseComponent,
    YoutubePlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(
      [
        VideoTitleComponent,
        ShowImgComponent,
        MatCheckboxComponent,
        DateParseComponent
      ]
    )
  ],
  providers: [
    GridService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    YoutubePlayerComponent
  ]
})
export class AppModule { }
