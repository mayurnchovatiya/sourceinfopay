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
    let date = '';
    let telephone = '';
    let email = '';
    let pvCompany = '';
    let pvTelephone = '';
    let pvContactPerson = '';
    let pvEmail = '';
    let pvRate = '';
    let pvFax = '';
    let svCompany = '';
    let svTelephone = '';
    let svContactPerson = '';
    let svEmail = '';
    let svRate = '';
    let svFax = '';
    let salesPerson = '';
    let salesPersonCommission = '';
    let recruiter = '';
    let recruiterCommission = '';
    let managerOne = '';
    let managerOneCommission = '';
    let managerTwo = '';
    let managerTwoCommission = '';

    this.candidateForm = new FormGroup({
      'candidateName': new FormControl(candidateName, Validators.required),
      'date': new FormControl(date),
      'telephone': new FormControl(telephone),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'primeVendor': new FormGroup({
        'pvCompany': new FormControl(pvCompany),
        'pvTelephone': new FormControl(pvTelephone),
        'pvContactPerson': new FormControl(pvContactPerson),
        'pvEmail': new FormControl(pvEmail),
        'pvRate': new FormControl(pvRate),
        'pvFax': new FormControl(pvFax)
      }),

      'subVendor': new FormGroup({
        'svCompany': new FormControl(svCompany),
        'svTelephone': new FormControl(svTelephone),
        'svContactPerson': new FormControl(svContactPerson),
        'svEmail': new FormControl(svEmail),
        'svRate': new FormControl(svRate),
        'svFax': new FormControl(svFax)
      }),

      'salesPerson': new FormGroup({
        'salesPerson': new FormControl(salesPerson),
      }),

      'recruiter': new FormGroup({
        'recruiter': new FormControl(recruiter),
      }),

      'managerOne': new FormGroup({
        'managerOne': new FormControl(managerOne),
      }),

      'managerTwo': new FormGroup({
        'managerTwo': new FormControl(managerTwo),
      }),

      'commission': new FormGroup({
        'salesPersonCommission': new FormControl(salesPersonCommission),
        'recruiterCommission': new FormControl(recruiterCommission),
        'managerOneCommission': new FormControl(managerOneCommission),
        'managerTwoCommission': new FormControl(managerOneCommission)
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
