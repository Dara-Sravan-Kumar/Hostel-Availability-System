import { Button, DataTable, Snackbar } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { useEffect, useState } from 'react';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
// import AddCourse from "./components/admin/course/AdminCourse"
import {
  TableIconsWrapper,
  TableIconWrapper,
  Wrapper,
  AddCourse,
} from './style';
import Block from '../icons/Block.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { sortbyTime } from '../../../util/util';

const AdminCourse = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch('/student/viewCourses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(sortbyTime(data));
        console.log(data);
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

  const handleCourseDelete = async (courseID) => {
    try {
      setLoading(true);
      const res=await fetch(`/admin/deleteCourse/${courseID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Course Deleted Successfully") {
        throw res;
      }
      setSnackbar({
        message: res,
        variant: 'success',
      });

      await fetchData();
    } catch (e) {
      setSnackbar({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };


  const getCourseData = () => {
    if (!courses) {
      return;
    }


    return courses.map((course) => {
      return [
        course.courseName || '-',
        course.courseDuration  || '-',
        <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/course/edit/:courseID', {
                  courseID: course.courseID,
                })
              );
            }}
            isDisabled={loading}
            title={'Edit course'}
          >
            <Edit />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleCourseDelete.bind(this, course.courseID)}
            isDisabled={loading}
            title={'Delete course'}
          >
            <Trash />
          </TableIconWrapper>
         </TableIconsWrapper>
       ];
     });
    }

    let data = getCourseData();

    return (
      <AdminDashboard>
        <Wrapper>
          {loading ? (
            <Welcome>Loading....</Welcome>
          ) : (
            <>
              <AddCourse>
                  <Button color='secondary' onClick={() => navigate('/admin/course/add')}>+ Add Course</Button>
              </AddCourse>
              <DataTable
                headers={[
                  'Course Name',
                  'Course Duration',
                  'Actions',
                ]}
                rows={data}
                noData={'No hostels found'}
                perPage={{
                  label: '5',
                  value: 5,
                }}
              />
            </>
          )}
          {snackbar && snackbar.message && (
            <Snackbar
              message={snackbar.message}
              variant={snackbar.variant}
              onClose={() => setSnackbar(null)}
            />
          )}
        </Wrapper>
      </AdminDashboard>
    );
  }; 
     

export default AdminCourse;