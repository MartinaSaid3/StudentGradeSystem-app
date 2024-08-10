import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentListComponent } from "./Components/student-list/student-list.component";
import { StudentAddEditComponent } from "./Components/student-add-edit/student-add-edit.component";
import { GradeEditComponent } from "./Components/grade-edit/grade-edit.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentListComponent, StudentAddEditComponent, GradeEditComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GradeSystem-app';
}
