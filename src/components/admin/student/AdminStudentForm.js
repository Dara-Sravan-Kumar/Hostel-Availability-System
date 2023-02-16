import { Input, SimpleSelect } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { Welcome } from '../dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';
import { genders } from './data';


const AdminStudentForm = ({ form, setForm, edit }) => {
  const [courses, setCourses] = useState()
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState();
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/student/viewCourses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.map((course) => ({
          label: course.courseName,
          value: course.courseID
        })));
      })
      .catch((e) => {
        console.error(e);
        setSnackbar({
          variant: 'error',
          message: e,
        });
      }).finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (name) => (e) => {
    let value = e;
    if (e.currentTarget) {
      value = e.currentTarget.value || '';
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      {loading ? (
        <Welcome>Loading....</Welcome>
      ) : (
        <>
          <StyledFieldWrapper helperText={form.notValid.studentName} helperType={'error'} label='Student Name'>
            <Input
              onChange={handleChange('studentName')}
              placeholder='e.g. Priti Kumari.'
              error={!!form.notValid.studentName}
              value={form.studentName}
              
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.email} helperType={'error'} label='Student Email'>
            <Input
              onChange={handleChange('email')}
              placeholder='e.g. eg@example.com.'
              error={!!form.notValid.email}
              value={form.email}
              disabled={edit}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.studentRollNo} helperType={'error'} label='Student Roll No.'>
            <Input
              onChange={handleChange('studentRollNo')}
              placeholder='Roll No format - EnrollmentYear/CourseName/RollNo with maximum length of 15 characters without spaces.'
              error={!!form.notValid.studentRollNo}
              value={form.studentRollNo}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.studentPhoneNo} helperType={'error'} label='Student Phone No'>
            <Input
              onChange={handleChange('studentPhoneNo')}
              placeholder='e.g. 9862345674.'
              error={!!form.notValid.studentPhoneNo}
              value={form.studentPhoneNo}
            />
              </StyledFieldWrapper>
              <StyledFieldWrapper helperText={form.notValid.password} helperType={'error'}
                label='Student Password'
                // helperText='Set a password for the warden'
              >
                <Input
                  onChange={handleChange('password')}
                  type={'password'}
                  placeholder='Min 8 and max 14 characters, at least one uppercase and one lowercase letter, one number and one special character'
                  error={!!form.notValid.password}
                  value={form.password}
                  disabled={edit}
                />
              </StyledFieldWrapper>          
          <StyledFieldWrapper helperText={form.notValid.studentGender} helperType={'error'} label='Student Gender'>
          <SimpleSelect
              margin={0}
              options={genders}
              handleChange={handleChange('studentGender')}
              error={!!form.notValid.studentGender}
              value={form.studentGender}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.course} helperType={'error'} label='Course'>
          <SimpleSelect
              margin={0}
              options={courses}
              handleChange={handleChange('course')}
              value={form.course}
            />
          </StyledFieldWrapper>
          
          {snackbar && snackbar.message && (
            <snackbar
              message={snackbar.message}
              variant={snackbar.variant}
              onClose={() => setSnackbar(null)}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminStudentForm;
