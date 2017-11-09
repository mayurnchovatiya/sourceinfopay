import { Component, Input} from '@angular/core';
import { Candidate } from './../../../model/candidate.model';


@Component({
  selector: 'app-candidates-item',
  templateUrl: './candidates-item.component.html',
  styleUrls: ['./candidates-item.component.css']
})
export class CandidatesItemComponent {
  @Input() candidates: Candidate;
  @Input() index: number;
}  
