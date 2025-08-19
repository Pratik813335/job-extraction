import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';
// @mui
import {
  alpha,
  Table,
  Tab,
  Tabs,
  Card,
  Button,
  Tooltip,
  Container,
  TableBody,
  IconButton,
  TableContainer,
  TableRow,
  TableCell,
} from '@mui/material';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// _mock
// import { _companyList } from 'src/_mock/_company';
import { _roles, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,

} from 'src/components/table';
// import { TableRow,TableCell } from '@mui/material';

//
import CompanyTableFiltersResult from '../company-table-filters-result';
import CompanyTableRow from '../company-table-row';
import CompanyTableToolbar from '../company-table-toolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const companyMock = [
  {
    "id": 1,
    "companyName": "TechNova Solutions",
    "address": "123 Main Street, Pune, Maharashtra",
    "phoneNumber": "+91-9876543210",
    "email": "contact@technova.com",
    "status": "active",
    "role": "Supplier",
    "createdAt": "2025-08-01T10:30:00Z"
  },
  {
    "id": 2,
    "companyName": "GreenLeaf Industries",
    "address": "456 Park Avenue, Nashik, Maharashtra",
    "phoneNumber": "+91-9123456780",
    "email": "info@greenleaf.com",
    "status": "rejected",
    "role": "Client",
    "createdAt": "2025-08-05T14:20:00Z"
  },
  {
    "id": 3,
    "companyName": "BlueOcean Tech",
    "address": "789 Silicon Valley Road, Mumbai",
    "phoneNumber": "+91-9988776655",
    "email": "support@blueocean.com",
    "status": "pending",
    "role": "Partner",
    "createdAt": "2025-08-10T09:15:00Z"
  },
  {
    "id": 4,
    "companyName": "NextGen Corp",
    "address": "22 IT Park, Bangalore",
    "phoneNumber": "+91-9090909090",
    "email": "hello@nextgen.com",
    "status": "active",
    "role": "HR Manager",
    "createdAt": "2025-08-12T16:45:00Z"
  }
]


const TABLE_HEAD = [
  { id: 'companyName', label: 'Company Name' },
  { id: 'address', label: 'Addrerss', width: 180 },
  { id: 'phoneNumber', label: 'Phone Number', width: 220 },
  { id: 'email', label: 'Email', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'role', label: 'Role', width: 100 },
  { id: 'createdAt', label: 'Created At', width: 100 },
  { id: '', width: 88 },
];

const defaultFilters = {
  companyName: '',
  email: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(companyMock);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (companyName, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [companyName]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.company.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Company', href: paths.dashboard.company.root },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={paths.dashboard.user.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New User
          //   </Button>
          // }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'banned' && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && tableData.length}
                    {tab.value === 'active' &&
                      tableData.filter((company) => company.status === 'active').length}

                    {tab.value === 'pending' &&
                      tableData.filter((company) => company.status === 'pending').length}
                    {tab.value === 'banned' &&
                      tableData.filter((company) => company.status === 'banned').length}
                    {tab.value === 'rejected' &&
                      tableData.filter((company) => company.status === 'rejected').length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <CompanyTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <CompanyTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {/* <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.length > 0 ? (
                    dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <CompanyTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={8}>
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>


              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { companyName, status, email } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (companyName) {
    inputData = inputData.filter(
      (company) => company.companyName.toLowerCase().indexOf(companyName.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((company) => company.status === status);
  }

  if (email.length) {
    inputData = inputData.filter((company) => email.includes(company.email));
  }

  return inputData;
}
