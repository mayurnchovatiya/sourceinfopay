import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateEditComponent } from './candidates/candidate-edit/candidate-edit.component';
import { CandidateStartComponent } from './candidates/candidate-start/candidate-start.component';
import { CandidatesDetailComponent } from './candidates/candidates-detail/candidates-detail.component';
import { CandidatesComponent } from './candidates/candidates.component';

const appRoutes = [
    { path: '', redirectTo: '/candidates', pathMatch: 'full' },
    {
        path: 'candidates', component: CandidatesComponent, children: [
            { path: '', component: CandidateStartComponent },
            { path: 'new', component: CandidateEditComponent },
            { path: ':id', component: CandidatesDetailComponent },
            // { path: ':id/edit', component: CandidateEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutingModule {

}