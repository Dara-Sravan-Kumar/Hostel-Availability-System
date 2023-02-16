import { Input, SimpleSelect } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { Welcome } from '../../admin/dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';
import { genders } from './data';
import { useNavigate, useParams } from 'react-router-dom';


const StudentForm = ({ form, setForm, edit }) => {
  const [courses, setCourses] = useState()
  const [Genders, setGenders] = useState()
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState();
  //const { userEmail } = useParams();
  const [userEmail, setUserEmail] = useLocalState("", "userEmail");
  console.log(userEmail);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    
    fetch(`/student/viewProfile/${userEmail}`,{
      method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
          },
          })
      .then((response) => response.json())
      .then((data) => {
        setCourses(({
          label: data.course.courseName,
          value: data.course.courseID
        }));
        setGenders(({
          label: data.studentGender,
          value: data.studentGender
        }));
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
          <StyledFieldWrapper label='Student Name'>
            <Input
              onChange={handleChange('studentName')}
              placeholder='e.g. Priti Kumari.'
              error={!!form.notValid.studentName}
              value={form.studentName}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Student Email'>
            <Input
              onChange={handleChange('email')}
              placeholder='e.g. priti12@gmail.com.'
              error={!!form.notValid.email}
              value={form.email}
              disabled={edit}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Student Roll No.'>
            <Input
              onChange={handleChange('studentRollNo')}
              placeholder='e.g. 34.'
              error={!!form.notValid.studentRollNo}
              value={form.studentRollNo}
              disabled={edit}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Student Phone No'>
            <Input
              onChange={handleChange('studentPhoneNo')}
              placeholder='e.g. 9862345674.'
              error={!!form.notValid.studentPhoneNo}
              value={form.studentPhoneNo}
            />
              </StyledFieldWrapper>
              <StyledFieldWrapper
                label='Student Password'
                helperText='Set a password for the warden'
              >
                <Input
                  onChange={handleChange('password')}
                  type={'password'}
                  placeholder='e.g. ********'
                  error={!!form.notValid.password}
                  value={form.password}
                  disabled={edit}
                />
              </StyledFieldWrapper>          
          <StyledFieldWrapper label='Student Gender'>
          <SimpleSelect
              margin={0}
              options={genders}
              onChange={handleChange('studentGender')}
              value={form.studentGender}
              isDisabled={true}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Course'>
          <SimpleSelect
              margin={0}
              options={courses}
              handleChange={handleChange('course')}
              value={form.course}
              isDisabled={true}
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

export default StudentForm;
