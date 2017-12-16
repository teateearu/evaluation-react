import {
  RANDOM_STUDENT_FETCHED
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {

    case RANDOM_STUDENT_FETCHED :

    const students = [...payload]

    const greenStudents = students.filter(student => student.color === 'green')
    const yellowStudents = students.filter(student => student.color === 'yellow')
    const redStudents = students.filter(student => student.color === 'red')

    function pickStudentByColor(array) {return array[Math.floor(Math.random() * array.length)];}

    function pickRandomStudent() {
      var number = Math.floor(Math.random() * 100 );
      switch (true) {
      case (number < 50) :
        return pickStudentByColor(redStudents);
      case (number <= 83) :
        return pickStudentByColor(yellowStudents);
      case (number > 83) :
        return pickStudentByColor(greenStudents);
      default :
        return '???';
      }
    }
  }
}
