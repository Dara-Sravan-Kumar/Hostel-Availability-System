import { Input, SimpleSelect } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { Welcome } from '../dashboard/style';
import { StyledFieldWrapper } from './style';
import { useLocalState } from '../../../util/useLocalStorage';
import { hostelTypes } from './data';
import { hostelStatuses } from './data';


const AdminHostelForm = ({ form, setForm, edit }) => {
  const [wardens, setWardens] = useState([]);
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
    fetch('/admin/viewWardens',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWardens([
          {
            label: 'Add new warden',
            value: 'new-warden',
          },
          ...data.map((warden) => ({
            label: warden.email,
            value: warden.email,
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

  const handleNewWarden = (name) => (e) => {
    let value = e;
    if (e.currentTarget) {
      value = e.currentTarget.value || '';
    }

    setForm({
      ...form,newWarden: {...form.newWarden,[name]: value,},
    });
  };

  return (
    <>
      {loading ? (
        <Welcome>Loading....</Welcome>
      ) : (
        <>
          <StyledFieldWrapper helperText={form.notValid.hostelName} helperType={'error'} label='Hostel Name'>
            <Input
              onChange={handleChange('hostelName')}
              placeholder='e.g. Aravali'
              error={!!form.notValid.hostelName}
              value={form.hostelName}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.hostelType} helperType={'error'} label='Hostel Type'>
            <SimpleSelect
              margin={0}
              options={hostelTypes}
              handleChange={handleChange('hostelType')}
              value={form.hostelType}
              isDisabled={edit}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Hostel Status' helperText={form.notValid.hostelStatus} helperType={'error'}>
            <SimpleSelect
              margin={0}
              options={hostelStatuses}
              handleChange={handleChange('hostelStatus')}
              value={form.hostelStatus}
              isDisabled={edit}
            />  
          </StyledFieldWrapper>
          <StyledFieldWrapper label='Hostel Rooms' helperText={form.notValid.hostelRooms} helperType={'error'}>
            <Input
              onChange={handleChange('hostelRooms')}
              placeholder='e.g. 10'
              type={'number'}
              error={!!form.notValid.hostelRooms}
              value={form.hostelRooms}
              disabled={true}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper helperText={form.notValid.warden} helperType={'error'} label='Warden'>
            <SimpleSelect
              margin={0}
              options={wardens}
              handleChange={handleChange('warden')}
              value={form.warden}
            />
          </StyledFieldWrapper >
          {form.warden && form.warden.value === 'new-warden' && (
            <>
              <StyledFieldWrapper helperText={form.notValid.newWarden.name} helperType={'error'} label='Warden Name'>
                <Input
                  onChange={handleNewWarden('name')}
                  placeholder='e.g. Dhar'
                  error={!!form.notValid.newWarden.name}
                  value={form.newWarden.name}
                />
              </StyledFieldWrapper>
              <StyledFieldWrapper helperText={form.notValid.newWarden.email} helperType={'error'} label='Warden Email'>
                <Input
                  onChange={handleNewWarden('email')}
                  placeholder='e.g. dhar@optum.com'
                  error={!!form.notValid.newWarden.email}
                  value={form.newWarden.email}
                />
              </StyledFieldWrapper>
              <StyledFieldWrapper
                label='Warden Password'
                helperText={form.notValid.newWarden.password}
                helperType={'error'}
              >
                <Input
                  onChange={handleNewWarden('password')}
                  type={'password'}
                  placeholder='e.g. ********'
                  error={!!form.notValid.newWarden.password}
                  value={form.newWarden.password}
                />
              </StyledFieldWrapper>
              <StyledFieldWrapper label='Warden Phone' helperText={form.notValid.newWarden.phone}
                helperType={'error'}>
                <Input
                  onChange={handleNewWarden('phone')}
                  placeholder='e.g. 9876543210'
                  type='number'
                  error={!!form.notValid.newWarden.phone}
                  value={form.newWarden.phone}
                />
              </StyledFieldWrapper>
            </>
          )}
         
        </>
      )}
    </>
  );
};

export default AdminHostelForm;
