import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminStudentForm from './AdminStudentForm'; 
import { addStudentInit } from './data';
import { Wrapper } from './style';

const AdminStudentAdd = () => {
  const [students, setStudents] = useState();
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(addStudentInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  const isValid = () => {
    let valid = true;
    const notValid = { ...addStudentInit.notValid };

    if (form.studentName.length>=20 || form.studentName.length<=3 || !form.studentName) {
      notValid.studentName = 'Student Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
      valid = false;
    }

    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    if ( form.email.length<=3 || form.email.length>=100 || !validateEmail(form.email)) {
      notValid.email = 'Email cannot be empty and Should be in format of eg@gmail.com ';
      valid = false;
    }
    function validateRollNo(rollNo) {
      var re = /^\d[20]\d{2}\/[A-Za-z.]{2,15}\/\d{1,3}$/;
            return re.test(rollNo);
    }

     if ( form.studentRollNo.length>=15 || !validateRollNo(form.studentRollNo)  ) {
      notValid.studentRollNo = 'Please enter a valid Student Roll No. Example format - EnrollmentYear/CourseName/RollNo with maximum length of 15 characters without spaces.';
      valid = false;
    }

    if (String(form.studentPhoneNo).length !==10) {
      notValid.studentPhoneNo = 'Please enter a valid Student Phone No with 10 digits';
      valid = false;
    }

    if (!form.studentGender) {
      notValid.studentGender = 'Please enter a valid Student Gender';
      valid = false;
    }
    function validatePassword(password) {
      var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
      return re.test(password);
    }
    if (!form.password || !validatePassword(form.password)) {
      notValid.password = 'Please enter a valid password (Minimum 8 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character)';
      valid = false;
    }

    if (!form.course) {
      notValid.course = 'Course Could not be empty';
      valid = false;
    }
    


    setForm({ ...form, notValid });
    return valid;
  };


  const handleAdd = async () => {
    if (!isValid()) {
      console.log(form)
      return;
    }

    try {
      setLoading(true);
      const studentPayload = {
        "name": form.studentName,
        "email": form.email,
        "phoneNo": form.studentPhoneNo,
        "rollNo": form.studentRollNo,
        "gender": form.studentGender.value,
        "courseName": form.course.label,
        "password":form.password
      };


      // console.log(JSON.stringify(hostelPayload))
      


    const res= await fetch('/student/registration', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(studentPayload),
      }).then((resp) => {return resp.text()});

      if(res !== "Student Registered") {
        throw res;
      }

      setSnackbar({
        message: res,
        variant: 'success',
      });

      navigate('/admin/student');
    } catch (e) {
      console.error(e);
      setSnackbar({
        message: JSON.parse(e).message,
        variant: 'error',
      });
    }

    setLoading(false);
  };

  return (
    <AdminDashboard>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <Box
              title='Add Student'
              loading={loading}
            >
              <AdminStudentForm form={form} setForm={setForm} />
              <Button
                  color='secondary'
                  onClick={handleAdd}
                  isDisabled={loading}
                  size='S'
                >
                  Add
                </Button>
            </Box>
            {snackbar && snackbar.message && (
              <Snackbar
                message={snackbar.message}
                variant={snackbar.variant}
                onClose={() => setSnackbar(null)}
              />
            )}
          </>
        )}
      </Wrapper>
    </AdminDashboard>
  );
};

export default AdminStudentAdd;
