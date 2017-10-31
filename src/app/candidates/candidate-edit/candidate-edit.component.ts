import { Response } from '@angular/http';
import { DataStorageService } from './../data-storage.service';
import { CandidateService } from './../candidate.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit {
  id: number;
  editMode = false;
  candidateForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router,
    private dsService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSaveData() {
    this.dsService.storeCandidate().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onSubmit() {
    console.log(this.candidateForm.value);
    if (this.editMode) {
      this.candidateService.updateCandidate(this.id, this.candidateForm.value);
    } else {
      this.candidateService.addCandiidate(this.candidateForm.value);
    }
    this.onSaveData();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {

    let candidateName = '';
    let startDate = '';
    let endDate = '';
    let pvRate = '';
    let svRate = '';

    let pvName = '';
    let pvContactPerson = '';
    let pvAddress = '';
    let pvTelephone = '';
    let pvEmail = '';
    let pvFax = '';
    
    let svName = '';
    let svContactPerson = '';
    let svAddress = '';
    let svTelephone = '';
    let svEmail = '';
    let svFax = '';
    
    let seName = '';
    let seRole = '';

    let reName = '';
    let reRole = '';

    let moName = '';
    let moRole = '';

    let mtName = '';
    let mtRole = '';

    let salesCommission = '';
    let recruiterCommission = '';
    let managerOneCommission = '';
    let managerTwoCommission = '';

    this.candidateForm = new FormGroup({
      'candidateName': new FormControl(candidateName, Validators.required),
      'startDate': new FormControl(startDate),
      'endDate': new FormControl(endDate),
      'pvRate': new FormControl(pvRate),
      'svRate': new FormControl(svRate),

      'primeVendor': new FormGroup({
        'pvName': new FormControl(pvName, Validators.required),
        'pvContactPerson': new FormControl(pvContactPerson),
        'pvAddress': new FormControl(pvAddress),
        'pvTelephone': new FormControl(pvTelephone),
        'pvEmail': new FormControl(pvEmail),
        'pvFax': new FormControl(pvFax)
      }),

      'subVendor': new FormGroup({
        'svName': new FormControl(svName, Validators.required),
        'svContactPerson': new FormControl(svContactPerson),
        'svAddress': new FormControl(svAddress),
        'svTelephone': new FormControl(svTelephone),
        'svEmail': new FormControl(svEmail),
        'svFax': new FormControl(svFax)
      }),

      'salesEmployee': new FormGroup({
        'name': new FormControl(seName),
        'role': new FormControl(seRole)
      }),

      'recruiterEmployee': new FormGroup({
        'name': new FormControl(reName),
        'role': new FormControl(reRole)
      }),

      'managerOne': new FormGroup({
        'name': new FormControl(moName),
        'role': new FormControl(moRole)
      }),

      'managerTwo': new FormGroup({
        'name': new FormControl(mtName),
        'role': new FormControl(mtRole)
      }),

      'commission': new FormGroup({
        'salesCommission': new FormControl(salesCommission),
        'recruiterCommission': new FormControl(recruiterCommission),
        'managerOneCommission': new FormControl(managerOneCommission),
        'managerTwoCommission': new FormControl(managerTwoCommission)
      })

    });

    // let recipeName = '';
    // let recipeImagePath = '';
    // let recipeDescription = '';
    // let recipeIngredients = new FormArray([]);

    // if (this.editMode) {
    //   const recipe = this.candidateService.getCandidate(this.id);
    //   recipeName = recipe.name;
    //   recipeImagePath = recipe.imagePath;
    //   recipeDescription = recipe.description;
    // }

    // this.candidateForm = new FormGroup({
    //   'name': new FormControl(recipeName, Validators.required),
    //   'imagePath': new FormControl(recipeImagePath, Validators.required),
    //   'description': new FormControl(recipeDescription, Validators.required),
    //   'ingredients': recipeIngredients
    // });
  }

}
