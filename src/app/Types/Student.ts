import Grade from "./Grade";

export default class Student {

      studentID: number = 0;
      name: string = '';
      nationalID: string = '';
      academicYear: string = '';
      grade: string = "";
      grades: Grade[] = [];
}
