import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import Grade from '../../Types/Grade';

@Component({
  selector: 'app-grade-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './grade-edit.component.html',
  styleUrl: './grade-edit.component.css'
})
export class GradeEditComponent implements OnInit {
  gradeForm: FormGroup;
  studentId: number | null = null;
  subject: string | null = null;
  studentName: string | null = null;
  academicYear: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.gradeForm = this.fb.group({
      term1: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      term2: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      const studentId = params.get('studentId');
      const subject = params.get('subject');
      console.log(studentId && subject)
      console.log(studentId)
      if (studentId && subject) {
        this.studentId = +studentId;
        this.subject = subject;
        this.studentService.getStudent(this.studentId).subscribe(student => {
          this.studentName = student.name;
          this.academicYear = student.academicYear;
          const grade = student.grades.find((g: any) => g.subject === this.subject);
          if (grade) {
            this.gradeForm.patchValue(grade);
          }
        });
      }
      else if (studentId) {
        this.studentId = +studentId;
        this.gradeForm.addControl('subject',
          this.fb.control('', [Validators.required]));

          console.log("GGGG")
      }
    });
  }

  onSubmit(): void {
    if (this.gradeForm.invalid) {
      return;
    }

    const gradeData = {
      studentId: this.studentId,
      subject: this.subject,
      ...this.gradeForm.value
    };

    // Assuming there is an API endpoint to handle adding/updating grades
    this.studentService.updateGrade(this.studentId!, this.subject!, gradeData).subscribe(
      () => this.router.navigate(['/grades']),
      error => console.error(error)
    );
  }
}
