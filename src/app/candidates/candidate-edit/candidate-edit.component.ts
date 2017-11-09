import { Candidate } from './../../model/candidate.model';
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
  candidate: Candidate;

  constructor(private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router,
    private dsService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('OnInit editmode: ' + this.editMode);
        if (this.editMode) {
          this.candidate = this.candidateService.getCandidateById(this.id);
          console.log('after calling API candidate: ');
          console.log(this.candidate);
        }
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.candidateForm.value);
    if (this.editMode) {
      // this.candidateService.updateCandidate(this.id, this.candidateForm.value);
      console.log('onSubmit: editMode: ' + this.editMode);

      this.dsService.putCandidate(this.id, this.candidateForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.dsService.getCandidates();
          this.router.navigate(['candidates']);
        }
      );
    } else {
      this.dsService.postCandidate(this.candidateForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.dsService.getCandidates();
          this.router.navigate(['candidates']);
        }
      );
    }
    // this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let candidateId = null;
    let candidateName = '';
    let startDate = new Date();
    // let endDate = '';
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

    if (this.editMode) {
      // this.dsService.getCandidateById(this.id);
      // const candidate = this.candidateService.getCandidateById();
      // console.log('after calling API candidate: ');
      // console.log(candidate);
      candidateId = this.candidate.candidateId;
      candidateName = this.candidate.candidateName;
      startDate = new Date(this.candidate.startDate);
      // let endDate = '';
      pvRate = this.candidate.pvRate;
      svRate = this.candidate.svRate;
      pvName = this.candidate.primeVendor.pvName;
      pvContactPerson = this.candidate.primeVendor.pvContactPerson;
      pvAddress = this.candidate.primeVendor.pvAddress;
      pvTelephone = this.candidate.primeVendor.pvTelephone;
      pvEmail = this.candidate.primeVendor.pvEmail;
      pvFax = this.candidate.primeVendor.pvFax;

      svName = this.candidate.subVendor.svName;
      svContactPerson = this.candidate.subVendor.svContactPerson;
      svAddress = this.candidate.subVendor.svAddress;
      svTelephone = this.candidate.subVendor.svTelephone;
      svEmail = this.candidate.subVendor.svEmail;
      svFax = this.candidate.subVendor.svFax;

      seName = this.candidate.salesEmployee.name;
      seRole = this.candidate.salesEmployee.role;

      reName = this.candidate.recruiterEmployee.name;
      reRole = this.candidate.recruiterEmployee.role;

      moName = this.candidate.managerOne.name;
      moRole = this.candidate.managerOne.role;

      mtName = this.candidate.managerTwo.name;
      mtRole = this.candidate.managerTwo.role;

      salesCommission = this.candidate.commission.salesCommission;
      recruiterCommission = this.candidate.commission.recruiterCommission;
      managerOneCommission = this.candidate.commission.managerOneCommission;
      managerTwoCommission = this.candidate.commission.managerTwoCommission;
    }

    this.candidateForm = new FormGroup({ 
      'candidateId': new FormControl(candidateId),
      'candidateName': new FormControl(candidateName, Validators.required),
      'startDate': new FormControl(startDate),
      // 'endDate': new FormControl(endDate),
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
      }),

      'commission1': new FormGroup({
        'salesCommission1': new FormControl(salesCommission),
        'recruiterCommission1': new FormControl(recruiterCommission),
        'managerOneCommission1': new FormControl(managerOneCommission),
        'managerTwoCommission1': new FormControl(managerTwoCommission)
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
