import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminStudentForm from './AdminStudentForm'; 
import { addStudentInit, genders} from './data';
import { Wrapper } from './style';

const AdminStudentEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addStudentInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  const { studentEmail } = useParams();

  useEffect(() => {
    fetchData();
  }, [studentEmail]);

  const fetchData = () => {
    if (!studentEmail) {
      return;
    }

    fetch('/admin/viewStudents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const student = data.find((ele) => ele.email === studentEmail)
        const studentGender = genders.find((ele) => ele.value === student.studentGender)
       
        setForm({
          ...form,
          studentName: student.studentName,
          email: student.email ,
          studentRollNo: student.studentRollNo,
          studentPhoneNo: student.studentPhoneNo,
          studentGender,
          course: {
            label: student.course.courseName,
            value: student.course.courseID
          }
        })

        console.log(form)
      })
      .catch((e) => {
        console.error(e);
        setSnackbar({
          variant: 'error',
          message: e,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };



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

    if (!form.course) {
      notValid.course = 'Course Could not be empty';
      valid = false;
    }
    setForm({ ...form, notValid });
    return valid;
  };

  const handleEdit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      setLoading(true);
      await fetch(
        `/admin/editStudent/${studentEmail}?` + new URLSearchParams({
          studentName: form.studentName, 
          studentPhoneNo: form.studentPhoneNo,
          rollNo: form.studentRollNo,
          gender: form.studentGender.value,
          courseID: form.course.value
        }),
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
     
      navigate('/admin/student');
    } catch (e) {
      console.error(e);
      setSnackbar({
        message: e,
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
              title='Edit Student'
              loading={loading}
            >
              <AdminStudentForm form={form} setForm={setForm} edit={true} />
              <Button
                  color='secondary'
                  onClick={handleEdit}
                  isDisabled={loading}
                  size='S'
                >
                  Save
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

export default AdminStudentEdit;
