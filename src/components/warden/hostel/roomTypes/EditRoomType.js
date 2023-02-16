import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../../util/useLocalStorage';
import { Welcome } from '../../../admin/dashboard/style';
import AdminRoomTypeForm from '../../../admin/roomType/AdminRoomTypeForm';
import { addRoomTypeInit } from '../../../admin/roomType/data';
import { Wrapper } from '../../../admin/student/style';
import WardenHeader from '../../WardenHeader';
import {useLocation} from 'react-router-dom';


const EditRoomType = () => {
  const location = useLocation();
  const [roomName, setRoomName] = useState("");
  const [roomFee, setRoomFee] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addRoomTypeInit);
  // const [roomTypeID, setRoomTypeID] =useLocalState("", "roomTypeId");
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  // const { roomTypeId } = useParams();
  console.log(location.state.id)

  useEffect(() => {
    fetchData();
  }, [location.state.id]);

  const fetchData = () => {
    if (!location.state.id) {
      return;
    }

    fetch('/warden/viewRoomTypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const roomType = data.find((ele) => ele.roomTypeId === parseInt(location.state.id))
       
        setForm({
          ...form,
          roomTypeName: roomType.roomName,
          roomTypeFee: roomType.roomFee,
          roomTypeCapacity: roomType.roomCapacity,
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
    const notValid = { ...addRoomTypeInit.notValid };

    if (form.roomTypeName.length == 0 || form.roomTypeName.length <=1 || form.roomTypeName.length >=20) {
      notValid.roomTypeName = 'Room Name cannot be empty, should be grater than 1 characters & Less than 20 characters.';
      valid = false;
    }

    if (form.roomTypeFee.length == 0 || form.roomTypeFee === 0) {
      notValid.roomTypeFee = 'Fee cannot be empty or 0.';
      valid = false;
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
        `/warden/editRoomType/${location.state.id}, ${form.roomTypeName}, ${form.roomTypeFee}, ${form.roomTypeCapacity}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },

        }
      );
      window.location.href = "/warden/viewRoomTypes";
    } catch (e) {
      console.error(e);
      setSnackbar({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading(false);      
    }
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
              title='Edit Room Type'
              loading={loading}
            >
              <AdminRoomTypeForm form={form} setForm={setForm} edit={true} />
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
                message={snackbar.message}
                variant={snackbar.variant}
                onClose={() => setSnackbar(null)}
              />
            )}
          </>
        )}
      </Wrapper></>
  );
};

export default EditRoomType;
