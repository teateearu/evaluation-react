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
      var student = null;
        var number = Math.floor(Math.random() * 100 );
        switch (true) {
          case (number <= 50) :
            student = pickStudentByColor(redStudents);
            break;
          case (number <= 83) :
            student = pickStudentByColor(yellowStudents);
            break;
          case (number > 83) :
            student = pickStudentByColor(greenStudents);
            break;
          default :
            student = null;
            break;
        }
        if (student !== null)
        window.alert(student.name);
        return student;
      break;
    default :
      return 'lala';
  }
}
