import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';

import { Welcome } from '../../admin/dashboard/style';
import WardenHeader from '../WardenHeader';
import EditWardenForm from './EditWardenForm';
import { addWardenInit, hostelStatuses, hostelTypes } from '../../admin/Warden/data';
import { Wrapper } from '../../admin/Warden/style';

const EditWardenProfile = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addWardenInit);
  const [userEmail, setUserEmail] = useLocalState("", "userEmail");
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  // const {userEmail} = useParams();

  console.log(userEmail)
  useEffect(() => {
    fetchData();
  }, [userEmail]);

  const fetchData = () => {
    if (!userEmail) {
      return;
    }

    fetch(`/warden/viewWarden/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const warden = data
        console.log(form)

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
      notValid.wardenName = 'Please enter a valid Warden Name';
      valid = false;
    }


    if (!form.wardenPhoneNo || String(form.wardenPhoneNo).length!==10) {
      notValid.wardenPhoneNo = 'Please enter a valid Phone Number of 10 digits';
      valid = false;
    }

    // if (!form.hostel) {
    //   notValid.name = 'Please select a valid Hostel';
    //   valid = false;
    // }


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
        `/warden/editWarden/${form.wardenName}, ${form.wardenPhoneNo}, ${userEmail}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      navigate('/wardenDashboard');
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
    <>
    <WardenHeader/>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <Box
              title='Edit Warden'
              loading={loading}
            >
              <EditWardenForm form={form} setForm={setForm} edit={true} />
              <Button
                  color='secondary'
                  onClick={handleEdit}
                  isDisabled={loading}
                  size='S'
                  solid='Normal'
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
    </>
  );
};

export default EditWardenProfile;
