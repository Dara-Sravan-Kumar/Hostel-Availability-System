import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminWardenForm from './AdminWardenForm';
import { addWardenInit, hostelStatuses, hostelTypes } from './data';
import { Wrapper } from './style';

const AdminWardenEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addWardenInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  const {email} = useParams();

  console.log(email)
  useEffect(() => {
    fetchData();
  }, [email]);

  const fetchData = () => {
    if (!email) {
      return;
    }

    fetch('/admin/viewWardens1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const warden = data.find((ele) => ele.email == (email))
        // const warden = data
        // console.log(data.find(() =>))
        console.log(warden)
        console.log(typeof(email))
        console.log(warden.hostel.hostelId)
        const hostelType=hostelTypes.find((ele) => ele.value === warden.hostel.hostelType)
        const hostelStatus=hostelStatuses.find((ele) => ele.value === warden.hostel.hostelStatus)

        setForm({
          ...form,
          wardenName: warden.wardenName,
          email:warden.email ,
          wardenPhoneNo:warden.wardenPhoneNo ,
          hostel:{
            label:warden.hostel.hostelName,
            value:warden.hostel.hostelId
          },
          hostelId:warden.hostel.hostelId
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
      notValid.wardenPhoneNo = 'Please enter a valid Phone No of 10 digits';
      valid = false;
    }

    // function validatePassword(password) {
    //   var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    //   if(re.test(password) == true)
    //      return true;
    //   return false;
    // }
    // if (form.password.length == 0 || validatePassword(form.password) == false) {
    //   notValid.password = 'Please enter a valid password (Minimum 8 and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character)';
    //   valid = false;
    // }

    if (form.hostel.value === 'new-hostel') {
      if (form.newHostel.hostelName.length == 0 || form.newHostel.hostelName.length <=3 || form.newHostel.hostelName.length >= 20) {
        notValid.newHostel.hostelName = 'Hostel Name cannot be empty, should be grater than 3 characters & Less than 20 characters.';
        valid = false;
      }
      if (form.newHostel.hostelRooms.length == 0) {
        notValid.newHostel.hostelRooms = 'Number of rooms cannot be 0.';
        valid = false;
      }
      if (form.newHostel.hostelStatus.length == 0) {
        notValid.newHostel.hostelStatus = 'Please enter a valid status';
        valid = false;
      }
      if (form.newHostel.hostelType.length == 0) {
        notValid.newHostel.hostelType = 'Please enter a valid type';
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
      setLoading(true);
      await fetch(
        `/warden/editWarden/${form.wardenName}, ${form.wardenPhoneNo}, ${email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (form.hostel.value === 'no-hostel') {
        console.log(form)
        // const wardenPayload = {
        //   "name": form.wardenName,
        //   "email": form.email,
        //   "phoneNo": parseInt(form.wardenPhoneNo),
        //   "password": form.password,
        // };
  
        // console.log(form.hostel.value,form.hostel.hostelId,form.hostelId)
        await fetch(`/admin/unmapWarden/${form.hostelId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          // body: JSON.stringify(wardenPayload),
        });}

      if (form.hostel.value === 'new-hostel') {
        console.log(form)
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

        console.log(hostelId)

        await fetch(`/admin/mapWarden/${hostelId}?email=${email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }); 
      } else {
        await fetch(`/admin/mapWarden/${form.hostel.value}?email=${email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
      }
      navigate('/admin/warden');
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
              title='Edit Warden'
              loading={loading}
            >
              <AdminWardenForm form={form} setForm={setForm} edit={true} />
              <Button
                  color='secondary'
                  onClick={handleEdit}
                  isDisabled={loading}
                  size='S'
                >
                  Save
                </Button>
            </Box>

            {/* {snackbar && snackbar.message && (
              <Snackbar
                message={}
                variant={snackbar.variant}
                onClose={() => setSnackbar(null)}
              />
            )} */}
          </>
        )}
      </Wrapper>
    </AdminDashboard>
  );
};

export default AdminWardenEdit;
