import {
  RANDOM_STUDENT_FETCHED
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {

    case RANDOM_STUDENT_FETCHED :
      console.log("hello")

      const students = [ ...payload ]

      const greenStudents = students.filter(student => student.color === 'green')
      const yellowStudents = students.filter(student => student.color === 'yellow')
      const redStudents = students.filter(student => student.color === 'red')

      function pickStudentByColor(array) {return array[Math.floor(Math.random() * array.length)];}

      let student = null;
        var number = Math.floor(Math.random() * 100 );
        switch (true) {
          case (number <= 50) : // 50% chance (0 til 49)
            student = pickStudentByColor(redStudents);
            break;
          case (number <= 50 + 33) : // 33% chance (50 til 83)
            student = pickStudentByColor(yellowStudents);
            break;
          case (number > 50 + 33) : // 17% chance (84 til 100)
            student = pickStudentByColor(greenStudents);
            break;
          default :
            student = null;
            break;
        }
        if (student !== null)
        window.alert("Ask " + student.name + "! Their last evaluation was " + student.color + ".");
        return student;
      break;
    default :
      return 'lala';
  }
}
