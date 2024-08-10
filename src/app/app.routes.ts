import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { StudentAddEditComponent } from './Components/student-add-edit/student-add-edit.component';
import { GradeEditComponent } from './Components/grade-edit/grade-edit.component';
import { StudentGradesComponent } from './Components/student-grades/student-grades.component';
import { GradesListComponent } from './Components/grades-list/grades-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddEditComponent },
  { path: 'students/edit/:id', component: StudentAddEditComponent },
  // { path: 'students/:studentId/grades/:subject', component: GradeEditComponent },
  { path: 'grades', component: GradesListComponent },
  { path: "grades/:studentId/add", component: GradeEditComponent },
  { path: 'grades/:studentId/:subject', component: GradeEditComponent },
  { path: "students/:studentId/grades", component: StudentGradesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
