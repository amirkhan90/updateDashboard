import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { deleteEmployee, getEmployees } from 'src/redux/reducers/employee';
import AddEmployee from 'src/models/AddEmployee';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ data, tableType }) {
  const dispatch = useDispatch();
  const [action, setAction] = useState({ open: false, type: '', data: null });
  const token = localStorage.getItem('token');
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteEmployee({ token, id }));
    dispatch(getEmployees(token));
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => setAction({ open: true, type: 'edit employee', data: data })}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* i used two time this logic bacuse menu item can not expect react fregment is a child so i can not pass two child in a single place */}
        {tableType === 'user' && (
          <MenuItem
            component={RouterLink}
            to="#"
            sx={{ color: 'text.secondary' }}
            onClick={() => setAction({ open: true, type: 'edit role', data: data })}
          >
            <ListItemIcon>
              <Iconify icon="carbon:user-role" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Role" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
        {tableType === 'user' && (
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="teenyicons:password-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Change Password" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
        {tableType === 'user' && (
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="carbon:report" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Reports" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
        <AddEmployee {...action} handleClose={() => setAction({ open: false, type: '', data: null })} />
      </Menu>
    </>
  );
}
