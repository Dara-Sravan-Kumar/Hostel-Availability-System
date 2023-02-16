import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import { Welcome } from '../../admin/dashboard/style';
import StudentForm from './StudentForm'; 
import { addStudentInit, genders} from './data';
import { Wrapper } from './style';
import StudentHeader from '../StudentHeader';

const StudentEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addStudentInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  //const { userEmail } = useParams();
  const [userEmail, setUserEmail] = useLocalState("", "userEmail");
  useEffect(() => {
    fetchData();
  }, [userEmail]);

  const fetchData = () => {
    if (!userEmail) {
      return;
    }

    fetch(`/student/viewProfile/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.studentName);
        //const student = data.find((ele) => ele.email === userEmail)
        //const studentGender = genders.find((ele) => ele.value === student.studentGender)
        const student= data;
        console.log(student.studentGender,data.studentGender)
        const studentGender = genders.find((ele) => ele.value === student.studentGender)
        //console.log(studentGender);
        
       
        setForm({
          ...form,
          studentName: student.studentName,
          email: student.email ,
          studentRollNo: student.studentRollNo,
          studentPhoneNo: student.studentPhoneNo,
          password:student.password,
          studentGender,
          course: {
            label: student.course.courseName,
            value: student.course.courseID
          }
        })

        console.log("form",form);
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

    if (!form.studentName && !form.studentName.length<=5) {
      notValid.studentName = 'Please enter a valid Student Name';
      valid = false;
    }

    if (!form.studentPhoneNo || String(form.studentPhoneNo).length!==10) {
      notValid.studentPhoneNo = 'Please enter a valid Student Phone no of 10 digits';
      valid = false;
    }

    setForm({ ...form, notValid });
    console.log("form2",form);
    console.log(form.studentName);
    return valid;
  };

  const handleEdit = async () => {
    if (!isValid()) {
      return;
    }

    try {
     setLoading(true);
    
      await fetch(`/student/editProfile/${userEmail}?newStudentName=${form.studentName}&newPhoneNo=${form.studentPhoneNo}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
    })
     
      navigate('/studentDashboard');
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
    <>
    <StudentHeader/>
      <Wrapper>
        
          <>
            <Box
              title='Edit Student'
              // action={
              // }
              loading={loading}
            >
              <StudentForm form={form} setForm={setForm} edit={true} />
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
        
      </Wrapper>
    
    </>
  );
};

export default StudentEdit;
