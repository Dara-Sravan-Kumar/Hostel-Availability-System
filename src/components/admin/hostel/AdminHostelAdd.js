import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminHostelForm from './AdminHostelForm';
import { addHostelInit } from './data';
import { Wrapper } from './style';

const AdminHostelAdd = () => {
  const [hostels, setHostels] = useState();
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(addHostelInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  const isValid = () => {
    let valid = true;
    const notValid = { ...addHostelInit.notValid };

    if (form.hostelName.length>=20 || form.hostelName.length<=3 || form.hostelName.length === 0) {
      notValid.hostelName = 'Hostel Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
      valid = false;
    }
    

    if (form.hostelType.length === 0) {
      notValid.name = 'Please enter a valid Hostel Type';
      valid = false;
    }

    if (form.hostelStatus.length === 0) {
      notValid.name = 'Please enter a valid Hostel Status';
      valid = false;
    }

    if (form.hostelRooms.length === 0) {
      notValid.name = 'Please enter a valid Hostel Rooms';
      valid = false;
    }

    if (form.warden.length === 0) {
      notValid.name = 'Please select a valid warden';
      valid = false;
    }

    
    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(re.test(email) === true){
          return true;
      }
     
      return false;


    }

    if (form.warden.value === 'new-warden') {
      if ( form.newWarden.email.length >= 100 || validateEmail(form.newWarden.email) === false) {
        notValid.newWarden.email = 'Email cannot be empty and Should be in format of eg@gmail.com';
        valid = false;
      }
      if ( String(form.newWarden.phone).length===0 || String(form.newWarden.phone).length !== 10) {
        notValid.newWarden.phone = 'Please enter a valid phone No of 10 digits';
        valid = false;
      }
      if (form.newWarden.name.length === 0 || form.newWarden.name.length<=3 || form.newWarden.name.length >= 20) {
        notValid.newWarden.name = 'Warden Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
        valid = false;
      }

      function validatePassword(password) {
        var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
        if(re.test(password) === true){
          return true;
      }
        return false;
      }
      if (form.newWarden.password.length===0 || form.newWarden.password.length >= 20 || validatePassword(form.newWarden.password)===false) {
        notValid.newWarden.password = 'Please enter a valid password (Minimum 8 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character)';
        valid = false;
      }
    }


    setForm({ ...form, notValid });
    return valid;
  };


  const handleAdd = async () => {
    console.log(form)
    if (!isValid()) {
      return;
    }

    try {
      setLoading(true);
      const hostelPayload = {
        "hostelName": form.hostelName,
        "hostelType": form.hostelType.value,
        "hostelStatus": form.hostelStatus.value,
        "hostelRooms": parseInt(form.hostelRooms)
      };
      


      await fetch('/admin/addHostel', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(hostelPayload),
      });

      const hostelId = await fetch('/admin/getHostelId?'+ new URLSearchParams(hostelPayload), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});




      if (form.warden.value === 'new-warden') {
        const wardenPayload = {
          "name": form.newWarden.name,
          "email": form.newWarden.email,
          "password": form.newWarden.password,
          "phoneNo": parseInt(form.newWarden.phone),
        };

        await fetch('/admin/wardenRegistration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(wardenPayload),
        });


        await fetch(`/admin/mapWarden/${hostelId}?email=${form.newWarden.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

      } else {
        await fetch(`/admin/mapWarden/${hostelId}?email=${form.warden.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
      }

      navigate('/admin/hostel');
    } catch (e) {
      console.error(e);
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
              title='Add Hostel'
              loading={loading}
            >
              <AdminHostelForm form={form} setForm={setForm} />
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

export default AdminHostelAdd;
