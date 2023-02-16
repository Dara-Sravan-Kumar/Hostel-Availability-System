import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminCourseForm from './AdminCourseForm'; 
import { addCourseInit} from './data';
import { Wrapper } from './style';

const AdminCourseEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addCourseInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  const { courseId } = useParams();

  console.log("Loading:", loading)

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = () => {
    if (!courseId) {
      return;
    }

    fetch('/student/viewCourses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const course = data.find((ele) => ele.courseID === parseInt(courseId))
        console.log(courseId)
       
        setForm({
          ...form,
          courseName: course.courseName,
          courseDuration: course.courseDuration ,
        
        })
        console.log("temp")
      })
    
      .catch((e) => {
        console.error(e);
        setSnackbar({
          variant: 'error',
          message: e,
        });
      })
      .finally(() => {
        console.log("temp2")
        setLoading(false);
      });
  };

  const isValid = () => {
    let valid = true;
    const notValid = { ...addCourseInit.notValid };

    if (form.courseName.length >=20 || form.courseName.length <2 || form.courseName.length == 0) {
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

  const handleEdit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      setLoading(true);

      const coursePayload = {
        courseID:parseInt(courseId),
        courseName:form.courseName,
        courseDuration:parseInt(form.courseDuration),
      }

      console.log(coursePayload)
      await fetch(
        `/admin/editCourse`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(coursePayload),

        }
      );
     
      navigate('/admin/course');
    } catch (e) {
      console.error(e);
      setSnackbar({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading(false);      
    }
  };

  return (
    <AdminDashboard>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <Box
              title='Edit Course'
              loading={loading}
            >
              <AdminCourseForm form={form} setForm={setForm} edit={true} />
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

export default AdminCourseEdit;
