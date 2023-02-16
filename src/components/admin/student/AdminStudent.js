import { Button, DataTable, Snackbar } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { useEffect, useState } from 'react';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import {
  TableIconsWrapper,
  TableIconWrapper,
  Wrapper,
  AddStudent,
} from './style';
import { generatePath, useNavigate } from 'react-router-dom';
import { sortbyTime } from '../../../util/util';

const AdminStudent = () => {
  const [students, setStudents] = useState();
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
    fetch('/admin/viewStudents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(sortbyTime(data));
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

  const handleStudentDelete = async (studentId,email) => {
    try {
      setLoading(true);
      const res=await fetch(`/admin/removeStudent/${studentId},${email}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Student Removed Successfully") {
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


  const getStudentData = () => {
    if (!students) {
      return;
    }


    return students.map((student) => {
      return [
        student.studentName || '-',
        student.email  || '-',
        student.studentRollNo || '-',
        student.studentPhoneNo || '-',
        student.studentGender || '-',
        student.course.courseName || '-',
        student.course.courseDuration || '-',
        <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/student/edit/:studentEmail', {
                  studentEmail: student.email,
                })
              );
            }}
            isDisabled={loading}
            title={'Edit student'}
          >
            <Edit />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleStudentDelete.bind(this, student.studentId, student.email)}
            isDisabled={loading}
            title={'Delete student'}
          >
            <Trash />
          </TableIconWrapper>
         </TableIconsWrapper>
       ];
     });
    }

    let data = getStudentData();

    return (
      <AdminDashboard>
        <Wrapper>
          {loading ? (
            <Welcome>Loading....</Welcome>
          ) : (
            <>
              <AddStudent>
                  <Button color='secondary' onClick={() => navigate('/admin/student/add')}>+ Add Student</Button>
              </AddStudent>
              <DataTable
                headers={[
                  'Student Name',
                  'Email',
                  'Student Roll No.',
                  'Student Phone No',
                  'Student Gender',
                  'Course Name',
                  'Course Duration',
                  'Actions',
                ]}
                rows={data}
                noData={'No students found'}
                perPage={{
                  label: '7',
                  value: 7,
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
     

export default AdminStudent;