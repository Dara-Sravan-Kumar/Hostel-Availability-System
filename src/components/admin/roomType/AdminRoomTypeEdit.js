import { Button, Box, Snackbar } from '@blotoutio/ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import AdminRoomTypeForm from './AdminRoomTypeForm';
import { addRoomTypeInit} from './data';
import { Wrapper } from './style';

const AdminRoomTypeEdit = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(addRoomTypeInit);
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();
  const { roomTypeId } = useParams();

  useEffect(() => {
    fetchData();
  }, [roomTypeId]);

  const fetchData = () => {
    if (!roomTypeId) {
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
        const roomType = data.find((ele) => ele.roomTypeId === parseInt(roomTypeId))
       
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

    if ( form.roomTypeName.length >= 20 || form.roomTypeName.length <=1) {
      notValid.roomTypeName = 'Room Name cannot be empty, should be grater than 2 characters & Less than 20 characters.';
      valid = false;
    }

    if ( form.roomTypeFee === 0) {
        notValid.roomTypeFee = 'Please enter a valid Room Type Fee';
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
        `/warden/editRoomType/${roomTypeId}, ${form.roomTypeName}, ${form.roomTypeFee}, ${form.roomTypeCapacity}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },

        }
      );
     
      navigate('/admin/roomType');
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
    <AdminDashboard>
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
      </Wrapper>
    </AdminDashboard>
  );
};

export default AdminRoomTypeEdit;
