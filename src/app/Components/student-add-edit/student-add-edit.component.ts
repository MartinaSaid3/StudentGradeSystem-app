import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-student-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-add-edit.component.html',
  styleUrl: './student-add-edit.component.css'
})
export class StudentAddEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null = null;
  nationalIdErrorMessage = "";

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      nationalID: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      academicYear: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.studentId = +id;
        this.studentService.getStudent(this.studentId).subscribe(student => {
          this.studentForm.patchValue(student);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      return;
    }

    if (this.studentId) {
      this.studentService.updateStudent(this.studentId, { ...this.studentForm.value, studentID: this.studentId }).subscribe(
        (result) => {
          if (result.success) {
            this.router.navigate(['/students']);
          } else {
            this.nationalIdErrorMessage = result.message;
          }
        },
        error => console.error(error)
      );
    } else {
      this.studentService.addStudent(this.studentForm.value).subscribe(
        (result) => {
          if (result.success) {
            this.router.navigate(['/students']);
          } else {
            this.nationalIdErrorMessage = result.message;
          }
        },
        error => console.error(error)
      );
    }
  }
}
