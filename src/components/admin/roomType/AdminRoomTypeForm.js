import { Input } from '@blotoutio/ui-kit';
import { useState } from 'react';
import { Welcome } from '../dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';


const AdminRoomTypeForm = ({ form, setForm, edit }) => {
  
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

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
          <StyledFieldWrapper helperText={form.notValid.roomTypeName} helperType={'error'} label='Room Type Name'>
            <Input
              onChange={handleChange('roomTypeName')}
              placeholder='e.g. AC'
              error={!!form.notValid.roomTypeName}
              value={form.roomTypeName}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Room Type Fee' helperText={form.notValid.roomTypeFee} helperType={'error'}>
          <Input
              onChange={handleChange('roomTypeFee')}
              placeholder='e.g. 2000'
              error={!!form.notValid.roomTypeFee}
              value={form.roomTypeFee}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Room Type Capacity' helperText={form.notValid.roomTypeCapacity} helperType={'error'}>
          <Input
              onChange={handleChange('roomTypeCapacity')}
              placeholder='e.g. 200'
              error={!!form.notValid.roomTypeCapacity}
              value={form.roomTypeCapacity}
              disabled={edit}
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

export default AdminRoomTypeForm;
