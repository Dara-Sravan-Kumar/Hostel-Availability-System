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
  Release,
  AddHostel,
} from './style';
import Block from '../icons/Block.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { sortArraybyTime } from '../../../util/util';

const AdminHostel = () => {
  const [hostels, setHostels] = useState();
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
    fetch('/admin/viewHostels2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHostels(data);
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

  const handleHostelDelete = async (hostelId) => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/removeHostel/${hostelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {
        return resp.text();
      });
      // console.log(res);

      if(res !== "Hostel Removed Successfully") {
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

  const handleHostelBlock = async (hostelId, currentStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/blockHostel/${hostelId},${currentStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Hostel Blocked Successfully") {
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

  const handleHostelRelease = async (hostelId,currentStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/releaseHostel/${hostelId},${currentStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      console.log(res)

      if(res !== "Hostel Released Successfully") {
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
  }

  const getHostelData = () => {
    if (!hostels) {
      return;
    }

    return hostels.map((hostel) => {
      return [
        hostel.hostel.dateModified || '-',
        hostel.hostel.hostelName || '-',
        hostel.hostel.hostelType || '-',
        hostel.hostel.hostelStatus || '-',
        hostel.hostel.hostelRooms ?? '-',
        hostel.wardenName || '-',
        hostel.email || '-',
        <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/hostel/edit/:hostelId', {
                  hostelId: hostel.hostel.hostelId,
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
            onClick={handleHostelDelete.bind(this, hostel.hostel.hostelId)}
            isDisabled={loading}
            title={'Delete hostel'}
          >
            <Trash />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleHostelBlock.bind(this, hostel.hostel.hostelId,hostel.hostel.hostelStatus)}
            isDisabled={loading}
            title={'Block hostel'}
          >
            <img src={Block} />
          </TableIconWrapper>
          <TableIconWrapper
            onClick={handleHostelRelease.bind(this, hostel.hostel.hostelId,hostel.hostel.hostelStatus)}
            isDisabled={loading}
            title={'Release hostel'}
          >
            <Release>R</Release>
          </TableIconWrapper>
        </TableIconsWrapper>,
      ];
    });
  };

  const [hostels2, setHostels2] = useState();
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
    fetch('/admin/viewHostels1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt2}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHostels2(data);
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

  const handleHostelDelete2 = async (hostelId) => {
    try {
      setLoading2(true);
      const res = await fetch(`/admin/removeHostel/${hostelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Hostel Removed Successfully") {
        throw res;
      }
      setSnackbar({
        message: res,
        variant: 'success',
      });

      await fetchData2();
    } catch (e) {
      setSnackbar2({
        message: e,
        variant: 'error',
      });
    } finally {
      setLoading2(false);
    }
  };

  const handleHostelBlock2 = async (hostelId, currentStatus) => {
    try {
      setLoading2(true);
      const res = await fetch(`/admin/blockHostel/${hostelId},${currentStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Hostel Blocked Successfully") {
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
      setLoading(false);
    }
  };

  const handleHostelRelease2 = async (hostelId,currentStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`/admin/releaseHostel/${hostelId},${currentStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then((resp) => {return resp.text()});

      if(res !== "Hostel Released Successfully") {
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
      setLoading(false);
    }
  }


  const getHostelData2 = () => {
    if (!hostels2) {
      return;
    }
  return hostels2.map((hostel2) => {
    return [
      hostel2.dateModified || '-',
      hostel2.hostelName || '-',
      hostel2.hostelType || '-',
      hostel2.hostelStatus || '-',
      hostel2.hostelRooms ?? '-',
      "Not Assigned" || '-',
      "Not Assigned" || '-',
      <TableIconsWrapper>
          <TableIconWrapper
            onClick={() => {
              navigate(
                generatePath('/admin/hostel/edit2/:hostelId', {
                  hostelId: hostel2.hostelId,
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
            onClick={handleHostelDelete2.bind(this, hostel2.hostelId)}
            isDisabled={loading}
            title={'Delete hostel'}
          >
            <Trash />
          </TableIconWrapper>
          <TableIconWrapper
            className={'trash'}
            onClick={handleHostelBlock2.bind(this, hostel2.hostelId,hostel2.hostelStatus)}
            isDisabled={loading}
            title={'Block hostel'}
          >
            <img src={Block} />
          </TableIconWrapper>
          <TableIconWrapper
            onClick={handleHostelRelease2.bind(this, hostel2.hostelId,hostel2.hostelStatus)}
            isDisabled={loading}
            title={'Release hostel'}
          >
          <Release>R</Release>
        </TableIconWrapper>
      </TableIconsWrapper>,
    ];
  });
};

let data = getHostelData();
let data2 = getHostelData2();

let data3 = []
if(data != undefined && data2 != undefined) {
  data3 = [...data, ...data2]
} else if(data != undefined) {
  data3 = data2
} else if(data2 != undefined) {
  data3 = data
}

if(data3) {
  data3 = sortArraybyTime(data3).map((data) => data.slice(1));
}

  return (
    <AdminDashboard>
      <Wrapper>
        {loading ? (
          <Welcome>Loading....</Welcome>
        ) : (
          <>
            <AddHostel>
                <Button color='secondary' onClick={() => navigate('/admin/hostel/add')}>+ Add Hostel</Button>
            </AddHostel>
            <DataTable
              headers={[
                'Hostel Name',
                'Hostel Type',
                'Hostel Status',
                'Hostel Rooms',
                'Warden Name',
                'Warden Email',
                'Actions',
              ]}
              rows={data3}
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

export default AdminHostel;
