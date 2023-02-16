import { Input, SimpleSelect } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { Welcome } from '../dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';


const AdminCourseForm = ({ form, setForm, edit }) => {
  
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  console.log(form)

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
          <StyledFieldWrapper  helperText={form.notValid.courseName} helperType={'error'} label='Course Name'>
            <Input
              onChange={handleChange('courseName')}
              placeholder='e.g. B.E.'
              error={!!form.notValid.courseName}
              value={form.courseName}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.courseDuration} helperType={'error'}  label='Course Duration'>
          <Input
              onChange={handleChange('courseDuration')}
              placeholder='Course Duration in Years'
              error={!!form.notValid.courseDuration}
              value={form.courseDuration}
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

export default AdminCourseForm;
