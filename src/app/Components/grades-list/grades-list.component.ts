import { Component, inject, OnInit } from '@angular/core';
import Grade from '../../Types/Grade';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradeService } from '../../Services/grade.service';
import Student from '../../Types/Student';
import { StudentService } from '../../Services/student.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grades-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './grades-list.component.html',
  styleUrl: './grades-list.component.css'
})
export class GradesListComponent implements OnInit {

  grades: Grade[] = [];
  filteredGrades: Grade[] = [];
  subjects: string[] = [];
  succeededStudentsCount = 0;
  failedStudentsCount = 0;

  constructor(private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getGrades();
    this.calculateStudentResults();
  }

  private getGrades() {
    this.gradeService.getGrades().subscribe({
      next: (eventResult) => {
        this.grades = eventResult;
        this.filteredGrades = eventResult;
        this.subjects = this.grades.map((grade) => grade.subject).filter(this.onlyUnique);
      },
      error: () => { },
    });
  }

  calculateStudentResults(): void {
    this.gradeService.getGrades().subscribe({
      next:(eventResult)=>{
        this.succeededStudentsCount = this.grades.filter((g) => 
          ['A', 'B', 'C', 'D'].includes(g.grade)
        ).length;
    
        this.failedStudentsCount = this.grades.filter((g) => 
          ['F'].includes(g.grade)
        ).length;
      },
      error:()=>{},
    });
    
  }

  private onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
  }

  filterBySubject(e: Event) {
    const subject = (e.target as HTMLSelectElement).value;
    if (subject === 'All') {
      this.getGrades();
    } else {
      this.filteredGrades = this.grades.filter((grade) => grade.subject === subject);
    }
  }

}





  