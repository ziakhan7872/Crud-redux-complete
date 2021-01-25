import {
  FETCHING_STUDENTS_SUCCESS,
  SUBMIT_STUDENTS_SUCCESS,
  UPDATE_STUDENTS_SUCCESS,
  DELETE_STUDENTS_SUCCESS,
} from '../types';

export function fetchStudents() {
  //  console.log('yyyyyyyyyy');
  let getStudents = fetch('http://192.168.10.5:8081/AllStudents', {
    method: 'GET',
    header: {
      'Content-Type': 'applicaion/json',
    },
  }).then(async data => {
    return await data.json();
  });
  return {
    type: FETCHING_STUDENTS_SUCCESS,
    payload: getStudents,
  };
}

export function registerStudent(RollNumber, student_Name, age) {
  // console.log('age', age);
  let addStudents = fetch('http://192.168.10.5:8081/RegisterStudent', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      RollNumber: RollNumber,
      student_Name: student_Name,
      age: age,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    })
    .catch(error => {
      console.error(error);
    });
  return {
    type: SUBMIT_STUDENTS_SUCCESS,
    payload: addStudents,
  };
}

export function updateStudent(student_id, RollNumber, student_Name, age) {
  console.log('student_id', student_id);
  let updateStudents = fetch(
    'http://192.168.10.5:8081/UpdateStudent/' + student_id,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //  student_id: student_id,
        RollNumber: RollNumber,
        student_Name: student_Name,
        age: age,
      }),
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    })
    .catch(error => {
      console.error(error);
    });
  return {
    type: UPDATE_STUDENTS_SUCCESS,
    payload: updateStudents,
  };
}

export function deleteStudent(student_id) {
  console.log('student_id', student_id);
  let removeStudents = fetch('http://192.168.10.5:8081/delete/' + student_id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    });
  return {
    type: DELETE_STUDENTS_SUCCESS,
    payload: removeStudents,
  };
}
