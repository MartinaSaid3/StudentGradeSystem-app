import Student from "./Student";

export default class Grade {
      gradeID: number = 0;
      studentID: number = 0;
      subject: string = '';
      term1: number = 0;
      term2: number = 0;
      total: number = 0;
      grade: string = '';
      student: Student | undefined;
}