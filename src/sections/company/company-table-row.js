import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export default function CompanyTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { companyName,email , address, phoneNumber, status, role, createdAt } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* Checkbox */}
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/* Company Name & Email */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={companyName || 'N/A'}
            // secondary={email || 'N/A'}
            primaryTypographyProps={{ typography: 'body2' }}
            // secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        {/* Address */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{address || 'N/A'}</TableCell>

        {/* Phone Number */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber || 'N/A'}</TableCell>

        {/* Email */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email || 'N/A'}</TableCell>

        {/* Status */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              (status === 'rejected' && 'error') ||
              'default'
            }
          >
            {status || 'N/A'}
          </Label>
        </TableCell>

        {/* Role */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role || 'N/A'}</TableCell>


        {/* Created At */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {createdAt ? new Date(createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) : 'N/A'}
        </TableCell>

        {/* Actions */}
        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton color="primary" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* Popover */}
      {/* <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover> */}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure you want to delete ${companyName || ''}?`}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

CompanyTableRow.propTypes = {
  row: PropTypes.shape({
    companyName: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    role: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
};
