import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { PeopleComponent } from './pages/people/people.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'create', component: CreateComponent },
  { path: 'person/edit/:id', component: EditComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
