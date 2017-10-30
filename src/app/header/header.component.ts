import { Response } from '@angular/http';
import { DataStorageService } from './../candidates/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dsService: DataStorageService){}

  onSaveData() {
    this.dsService.storeCandidate().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dsService.getCandidates();
  }


}
