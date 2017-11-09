import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { DataStorageService } from './../candidates/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  editMode = true;
  constructor(private dsService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // onEditCandidate() {
  //   if (this.editMode) {
  //     this.router.navigate(['edit'], { relativeTo: this.route });
  //   } else {
  //     alert('please select Candidate to edit!');
  //   }
  // }

  // onSaveData() {
  //   this.dsService.storeCandidate().subscribe(
  //     (response: Response) => {
  //       console.log(response);
  //     }
  //   );
  // }

  // onFetchData() {
  //   this.dsService.getCandidates();
  // }


}
