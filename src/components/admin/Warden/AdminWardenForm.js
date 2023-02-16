import { Input, SimpleSelect } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { Welcome } from '../dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';
import { hostelTypes } from './data';
import { hostelStatuses } from './data';

const AdminWardenForm = ({ form, setForm, edit }) => {
  const [hostels, setHostels] = useState([]);
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  console.log(form)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/admin/viewHostels',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHostels([
          {
            label: 'Add new hostel',
            value: 'new-hostel',
          },
          {
            label: 'No Hostel',
            value: 'no-hostel',
          },
          ...data.map((hostel) => ({
            label: hostel.hostelName,
            value: hostel.hostelId
          })),
        ]);
      })
      .catch((e) => {
        console.error(e);
        setSnackbar({
          message: e,
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (name) => (e) => {
    let value = e;
    if (e.currentTarget) {
      value = e.currentTarget.value || '';
    }

    setForm({ ...form, [name]: value });
  };

  const handleNewHostel = (name) => (e) => {
    let value = e;
    if (e.currentTarget) {
      value = e.currentTarget.value || '';
    }

    setForm({
      ...form,newHostel: {...form.newHostel,[name]: value,},
    });
  };

  return (
    <>
      {loading ? (
        <Welcome>Loading....</Welcome>
      ) : (
        <>
          <StyledFieldWrapper label='Warden Name' helperText={form.notValid.wardenName} helperType={'error'}>
            <Input
              onChange={handleChange('wardenName')}
              placeholder='e.g. Pankaj'
              error={!!form.notValid.wardenName}
              value={form.wardenName}

            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Warden Email' helperText={form.notValid.email} helperType={'error'}>
          <Input
              placeholder='pankaj@optum.com'
              onChange={handleChange('email')}
              value={form.email}
              disabled={edit}
              />
          </StyledFieldWrapper>

          <StyledFieldWrapper label='Warden PhoneNo' helperText={form.notValid.wardenPhoneNo} helperType={'error'}>
            <Input
              placeholder='9876543210'
              type={'number'}
              onChange={handleChange('wardenPhoneNo')}
              value={form.wardenPhoneNo}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper label='Password' helperText={form.notValid.password} helperType={'error'}>
            <Input
              onChange={handleChange('password')}
              placeholder='e.g. *******'
              type={'password'}
              error={!!form.notValid.password}
              value={form.password}
              disabled={edit}

            />
          </StyledFieldWrapper>

          <StyledFieldWrapper label='Hostel' helperText={form.notValid.hostel} helperType={'error'}>
            <SimpleSelect
              margin={0}
              options={hostels}
              handleChange={handleChange('hostel')}
              value={form.hostel}
            />
          </StyledFieldWrapper>

          {form.hostel && form.hostel.value === 'new-hostel' && (
            <>
              <StyledFieldWrapper label='Hostel Name' helperText={form.notValid.newHostel.hostelName} helperType={'error'}>
                <Input
                  onChange={handleNewHostel('hostelName')}
                  placeholder='e.g. Aravali'
                  error={!!form.notValid.newHostel.hostelName}
                  value={form.newHostel.hostelName}
                />
              </StyledFieldWrapper>
              <StyledFieldWrapper label='Hostel Rooms'>
                <Input
                  onChange={handleNewHostel('hostelRooms')}
                  placeholder='e.g. 100'
                  error={!!form.notValid.newHostel.hostelRooms}
                  value={form.newHostel.hostelRooms}
                  disabled={true}
                />
              </StyledFieldWrapper>

              <StyledFieldWrapper label='hostel Status'>
                <SimpleSelect
              margin={0}
              options={hostelStatuses}
              handleChange={handleNewHostel('hostelStatus')}
              value={form.newHostel.hostelStatus}
                />
              </StyledFieldWrapper>
            
              <StyledFieldWrapper label='hostel Type'>
              <SimpleSelect
              margin={0}
              options={hostelTypes}
              handleChange={handleNewHostel('hostelType')}
              value={form.newHostel.hostelType}
              />
              </StyledFieldWrapper>
              </>
          )}
          
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

export default AdminWardenForm;
