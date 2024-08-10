import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import Student from '../../Types/Student';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [],
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.css'
})
export class StudentGradesComponent implements OnInit {
  student: Student | null = null;
  constructor(private route: ActivatedRoute, private studentService: StudentService) {
  }

  ngOnInit(): void {
    //read studentId and from paramsMap
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('studentId');
      if (!studentId) return;
      this.studentService.getStudent(+studentId).subscribe({
        next: student => this.student = student,
        error: error => console.error(error)
      })
    });
  }



}
