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
import Block from '../icons/Block.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { sortArraybyTime } from '../../../util/util';

const AdminWarden = () => {


  const [wardens2, setWardens2] = useState();
  const [loading2, setLoading2] = useState(true);
  const [jwt2, setJwt2] = useLocalState('', 'jwt');
  const [snackbar2, setSnackbar2] = useState({
    variant: 'success',
    message: '',
  });
  const navigate2 = useNavigate();

  useEffect(() => {
    fetchData2();
  }, []);

  const fetchData2 = async () => {
    fetch('/admin/viewWardens2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt2}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWardens2(data);
        console.log(data)
      })
      .catch((e) => {
        console.error(e);
        setSnackbar2({
          variant: 'error',
          message: e,
        });
      })
      .finally(() => {
        setLoading2(false);
      });
  };

  const handleWardenDelete2 = async (email) => {
    try {
      setLoading2(true);
      const res = await fetch(`/admin/removeWarden/${(email)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Warden Removed Successfully") {
        throw res;
      }
      setSnackbar({
        message: res,
        variant: 'success',
      });

      await fetchData2();
    } catch (e) {
      setSnackbar({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading2(false);
    }
  };


  const getWardenData2 = () => {
    if (!wardens2) {
      return;
    }
  return wardens2.map((warden2) => {
    return [
      warden2.dateModified || '-',
      warden2.wardenName || '-',
      warden2.email || '-',
      warden2.wardenPhoneNo || '-',
      "Not Assigned" || '-',
      "Not Assigned" || '-',
      "Not Assigned" || '-',
      "Not Assigned" || '-',
      <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/warden/edit2/:email', {
                  email: warden2.email,
                })
              );
            }}
            isDisabled={loading2}
            title={'Edit hostel'}
          >
            <Edit />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleWardenDelete2.bind(this, warden2.email)}
            isDisabled={loading2}
            title={'Delete hostel'}
          >
            <Trash />
          </TableIconWrapper>

      </TableIconsWrapper>,
    ];
  });
};


  const [wardens, setWardens] = useState();
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
    fetch('/admin/viewWardens1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWardens(data);
        console.log(data)

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

  const handleWardenDelete = async (email) => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/removeWarden/${(email)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {
        return resp.text();
      });
      // console.log(res);

      if(res !== "Warden Removed Successfully") {
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


  const getWardenData = () => {
    if (!wardens) {
      return;
    }

    console.log(wardens)


    return wardens.map((warden) => {
      return [
        warden.dateModified || '-',
        warden.wardenName || '-',
        warden.email || '-',
        warden.wardenPhoneNo || '-',
        warden.hostel.hostelName || '-',
        warden.hostel.hostelType || '-',
        warden.hostel.hostelStatus || '-',
        warden.hostel.hostelRooms ?? '-',
        <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/warden/edit/:email', {
                  email: warden.email,
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
            onClick={handleWardenDelete.bind(this, warden.email)}
            isDisabled={loading}
            title={'Delete hostel'}
          >
            <Trash />
          </TableIconWrapper>

        </TableIconsWrapper>,
      ];
    });
  };

let data = getWardenData();
let data2 = getWardenData2();

var data3 = []
if(data !== undefined && data2 !== undefined) {
  data3 = [...data, ...data2]
} else if(data !== undefined) {
  data3 = data2
} else if(data2 !== undefined) {
  data3 = data
}

if(data3) {
  data3 = sortArraybyTime(data3).map((data) => data.slice(1));
}

console.log("Data 3:", data3)

  return (
    <AdminDashboard>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <AddHostel>
                <Button color='secondary' onClick={() => navigate('/admin/warden/add')}>+ Add Warden</Button>
            </AddHostel>
            <DataTable
              headers={[
                'Warden Name',
                'Warden Email',
                'Warden Phone No',
                'Hostel Name',
                'Hostel Type',
                'Hostel Status',
                'Hostel Rooms',
                'Actions',
              ]}
              rows={data3}
              noData={'No wardens found'}
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

export default AdminWarden;
