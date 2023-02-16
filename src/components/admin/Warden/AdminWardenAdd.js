import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminWardenForm from './AdminWardenForm';
import { addWardenInit } from './data';
import { Wrapper } from './style';

const AdminHostelAdd = () => {
  const [hostels, setHostels] = useState();
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(addWardenInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  const isValid = () => {
    let valid = true;
    const notValid = { ...addWardenInit.notValid };

   
    if (form.wardenName.length>=20 || form.wardenName.length<=3 || form.wardenName.length == 0) {
      notValid.wardenName = 'Warden Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
      valid = false;
    }
    

    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(re.test(email) == true)
          return true;
      return false;
    }
    if ( form.email.length<=3 || form.email.length>=100 || validateEmail(form.email) == false) {
      notValid.email = 'Email cannot be empty and Should be in format of eg@gmail.com ';
      valid = false;
    }

    if (String(form.wardenPhoneNo).length==0 || String(form.wardenPhoneNo).length!==10) {
      notValid.wardenPhoneNo = 'Please enter a valid Phone No.';
      valid = false;
    }

    function validatePassword(password) {
      var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
      if(re.test(password) == true)
         return true;
      return false;
    }
    if (form.password.length == 0 || validatePassword(form.password) == false) {
      notValid.password = 'Please enter a valid password (Minimum 8 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character)';
      valid = false;
    }

    if (form.hostel.value === 'new-hostel') {
      if (form.newHostel.hostelName.length == 0 || form.newHostel.hostelName.length <=3 || form.newHostel.hostelName.length >= 20) {
        notValid.newHostel.hostelName = 'Hostel Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
        valid = false;
      }
      if (form.newHostel.hostelRooms.length == 0) {
        notValid.newHostel.hostelRooms = 'Number of rooms cannot be 0.';
        valid = false;
      }
      // if (form.newHostel.hostelStatus.length == 0) {
      //   notValid.newHostel.hostelStatus = 'Please enter a valid status';
      //   valid = false;
      // }
      // if (form.newHostel.hostelType.length == 0) {
      //   notValid.newHostel.hostelType = 'Please enter a valid type';
      //   valid = false;
      // }
    }


    setForm({ ...form, notValid });
    return valid;
  };


  const handleAdd = async () => {
    if (!isValid()) {
      console.log(form)
      return;
    }

    try {
      setLoading(true);

      if (form.hostel.value === 'no-hostel') {
      console.log(form)
      const wardenPayload = {
        "name": form.wardenName,
        "email": form.email,
        "phoneNo": parseInt(form.wardenPhoneNo),
        "password": form.password
      };

      await fetch('/admin/wardenRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(wardenPayload),
      });}


      if (form.hostel.value === 'new-hostel') {
        console.log(form)
        const wardenPayload = {
          "name": form.wardenName,
          "email": form.email,
          "phoneNo": parseInt(form.wardenPhoneNo),
          "password": form.password,
        };
  
        await fetch('/admin/wardenRegistration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(wardenPayload),
        });
      

        console.log(form.newHostel.name)
        const hostelPayload = {
          "hostelName": form.newHostel.hostelName,
          "hostelRooms": parseInt(form.newHostel.hostelRooms),
          "hostelStatus": form.newHostel.hostelStatus.value,
          "hostelType": form.newHostel.hostelType.value,
        };

        console.log(JSON.stringify(hostelPayload))
        await fetch('/admin/addHostel', {
          method: 'POST',
          headers: {
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


        await fetch(`/admin/mapWarden/${hostelId}?email=${form.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }); } else {

          const wardenPayload = {
            "name": form.wardenName,
            "email": form.email,
            "phoneNo": parseInt(form.wardenPhoneNo),
            "password": form.password,
          };
    
          await fetch('/admin/wardenRegistration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(wardenPayload),
          });

          await fetch(`/admin/mapWarden/${form.hostel.value}?email=${form.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          });

        }
      

      navigate('/admin/warden');
    }
     catch (e) {
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
              title='Add Warden'
              loading={loading}
            >
              <AdminWardenForm form={form} setForm={setForm} />
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
