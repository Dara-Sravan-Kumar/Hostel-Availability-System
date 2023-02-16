import { Button, DataTable, Snackbar } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { useEffect, useState } from 'react';
import { useLocalState } from '../../../util/useLocalStorage';
import AdminDashboard from '../dashboard/AdminDashboard';
import { Welcome } from '../dashboard/style';
import {
  TableIconsWrapper,
  TableIconWrapper,
  Wrapper,
  AddHostel,
} from './style';
import { generatePath, useNavigate } from 'react-router-dom';
import { sortbyTime } from '../../../util/util';

const AdminRoomType = () => {
  const [roomTypes, setRoomTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch('/warden/viewRoomTypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRoomTypes(sortbyTime(data))
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

  const handleRoomTypeDelete = async (roomTypeId) => {
    try {
      setLoading(true);
      const res = await fetch(`/warden/removeRoomType/${roomTypeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {
        return resp.text();
      });
      // console.log(res);

      if(res !== "Room Type Removed Successfully") {
        throw res;
      }
      setSnackbar({
        message: res,
        variant: 'success',
      });

      await fetchData();
    } catch (e) {
      setSnackbar({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };


  const getRoomTypeData = () => {
    if (!roomTypes && !roomTypes.length) {
      return;
    }


    return roomTypes.map((roomType) => {
      return [
        roomType.roomName || '-',
        roomType.roomFee || '-',
        roomType.roomCapacity || '-',
        <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/roomType/edit/:roomTypeId', {
                  roomTypeId: roomType.roomTypeId,
                })
              );
            }}
            isDisabled={loading}
            title={'Edit hostel'}
          >
            <Edit />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleRoomTypeDelete.bind(this, roomType.roomTypeId)}
            isDisabled={loading}
            title={'Delete hostel'}
          >
            <Trash />
          </TableIconWrapper>

        </TableIconsWrapper>,
      ];
    });
  };

  return (
    <AdminDashboard>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <AddHostel>
                <Button color='secondary' onClick={() => navigate('/admin/roomType/add')}>+ Add Room Type</Button>
            </AddHostel>
            <DataTable
              headers={[
                'Room Name',
                'Room Fee',
                'Room Capacity',
                'Actions',
              ]}
              rows={getRoomTypeData()}
              noData={'No hostels found'}
              perPage={{
                label: '5',
                value: 5,
              }}
            />
          </>
        )}
        {snackbar && snackbar.message && (
          <Snackbar
            message={snackbar.message}
            variant={snackbar.variant}
            onClose={() => setSnackbar(null)}
          />
        )}
      </Wrapper>
    </AdminDashboard>
  );
};

export default AdminRoomType;
