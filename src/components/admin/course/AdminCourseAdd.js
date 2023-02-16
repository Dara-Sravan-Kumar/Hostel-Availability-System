import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminCourseForm from './AdminCourseForm'; 
import { addCourseInit } from './data';
import { Wrapper } from './style';

const AdminCourseAdd = () => {
  const [courses, setCourses] = useState();
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(addCourseInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  const isValid = () => {
    let valid = true;
    const notValid = { ...addCourseInit.notValid };

    if (form.courseName.length >=20 || form.courseName.length <2  || form.courseName.length == 0) {
      notValid.courseName = 'Course Name cannot be empty, should be greater than 3 characters & Less than 20 characters.';
      valid = false;
    }

    if (form.courseDuration>=5 || form.courseDuration<=1 || form.courseDuration.length == 0) {
      notValid.courseDuration = 'Please enter a valid Course Duration';
      valid = false;
    }
    console.log(form)


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
      const coursePayload = {
        "courseName": form.courseName,
        "courseDuration": form.courseDuration,
      };


      // console.log(JSON.stringify(hostelPayload))
      
     const res = await fetch('/admin/addCourse', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(coursePayload),
      }).then((resp) => {return resp.text()});


      if(res !== "Course Added Successfully") {
        throw res;
      }

      setSnackbar({
        message: res,
        variant: 'success',
      });
      
      navigate('/admin/course');

    } catch (e) {
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
              title='Add Course'
              loading={loading}
            >
              <AdminCourseForm form={form} setForm={setForm} />
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

export default AdminCourseAdd;
