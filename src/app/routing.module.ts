import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiempComponent } from './candidates/candidates-detail/siemp/siemp.component';
import { PaidComponent } from './candidates/candidates-detail/paid/paid.component';
import { SvComponent } from './candidates/candidates-detail/sv/sv.component';
import { PvComponent } from './candidates/candidates-detail/pv/pv.component';
import { CandidateEditComponent } from './candidates/candidate-edit/candidate-edit.component';
import { CandidateStartComponent } from './candidates/candidate-start/candidate-start.component';
import { CandidatesDetailComponent } from './candidates/candidates-detail/candidates-detail.component';
import { CandidatesComponent } from './candidates/candidates.component';

const appRoutes = [
    { path: '', redirectTo: '/candidates', pathMatch: 'full' },
    { path: 'home', redirectTo: '/candidates', pathMatch: 'full' },
    {
        path: 'candidates', component: CandidatesComponent, children: [
            { path: '', component: CandidateStartComponent },
            { path: 'new', component: CandidateEditComponent },
            // { path: ':id/pv', component: PvComponent },
            { path: ':id', component: CandidatesDetailComponent, children: [
                { path: 'pv', component: PvComponent },
                { path: 'sv', component: SvComponent },
                { path: 'paid', component: PaidComponent },
                { path: 'siemp', component: SiempComponent }
            ] },
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