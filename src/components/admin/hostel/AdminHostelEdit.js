import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminHostelForm from './AdminHostelForm';
import { addHostelInit, hostelStatuses, hostelTypes } from './data';
import { Wrapper } from './style';

const AdminHostelEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addHostelInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  const { hostelId } = useParams();

  useEffect(() => {
    fetchData();
  }, [hostelId]);

  const fetchData = () => {
    if (!hostelId) {
      return;
    }

    fetch('/admin/viewHostels2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const hostel = data.find((ele) => ele.hostel.hostelId === parseInt(hostelId))
        console.log(hostel)
        console.log(typeof(hostelId))
        const hostelType=hostelTypes.find((ele) => ele.value === hostel.hostel.hostelType)
        const hostelStatus=hostelStatuses.find((ele) => ele.value === hostel.hostel.hostelStatus)

        setForm({
          ...form,
          hostelName: hostel.hostel.hostelName,
          hostelType ,
          hostelStatus ,
          hostelRooms: hostel.hostel.hostelRooms,
          warden:{
            label:hostel.email,
            value:hostel.email
          }
          // wardenName: hostel.wardenName,
          // wardenEmail: hostel.email,
          // phone: hostel.wardenPhoneNo
        })
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



  const isValid = () => {
    let valid = true;
    const notValid = { ...addHostelInit.notValid };

    if (form.hostelName.length==0 || form.hostelName.length <=3 || form.hostelName.length >=20) {
      notValid.hostelName = 'Hostel Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
      valid = false;
    }

    if (form.warden.length == 0) {
      notValid.name = 'Please select a valid warden';
      valid = false;
    }

    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(re.test(email) == true)
         return true;
      return false;
    }

    if (form.warden.value === 'new-warden') {
      if (form.newWarden.email.length==0 || form.newWarden.email.length >= 100 || validateEmail(form.newWarden.email) == false) {
        notValid.newWarden.email = 'Email cannot be empty and Should be in format of eg@gmail.com';
        valid = false;
      }
      if ( String(form.newWarden.phone).length===0 || String(form.newWarden.phone).length !== 10) {
        notValid.newWarden.phone = 'Please enter a valid phone of 10 digits';
        valid = false;
      }
      if (form.newWarden.name.length == 0 || form.newWarden.name.length<=3 || form.newWarden.name.length >= 20) {
        notValid.newWarden.name = 'Warden Name cannot be empty, should be greater than 3 characters & Less than 20 characters.';
        valid = false;
      }

      function validatePassword(password) {
        var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
        if(re.test(password) == true){
          return true;
      }
        return false;
      }
      if (form.newWarden.password.length==0 || form.newWarden.password.length >= 20 || validatePassword(form.newWarden.password)==false) {
        notValid.newWarden.password = 'Please enter a valid password (Minimum 8 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character)';
        valid = false;
      }
    }


    setForm({ ...form, notValid });
    return valid;
  };

  const handleEdit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      // console.log("coming")
      setLoading(true);
      await fetch(
        `/admin/editHostelName/${hostelId}?hostelName=${form.hostelName}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (form.warden.value === 'new-warden') {
        const wardenPayload = {
          name: form.newWarden.name,
          email: form.newWarden.email,
          password: form.newWarden.password,
          phoneNo: parseInt(form.newWarden.phone),
          // hostelId,
        };
        console.log(wardenPayload)

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
              title='Edit Hostel'
              loading={loading}
            >
              <AdminHostelForm form={form} setForm={setForm} edit={true} />
              <Button
                  color='secondary'
                  onClick={handleEdit}
                  isDisabled={loading}
                  size='S'
                >
                  Save
                </Button>
            </Box>
            {snackbar && snackbar.message && (
              <Snackbar
                message={"Hostel Details Edited Successfully"}
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

export default AdminHostelEdit;
