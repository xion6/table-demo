import * as React from 'react';
import './App.css';

import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import {
  DataGrid, GridColDef, GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid';

import { jaJP } from '@mui/x-data-grid/locales';
import type { } from '@mui/x-data-grid/themeAugmentation';

import { CustomFooterStatusComponent, FooterStatus } from './FooterStatus';

const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World', rating: 4, review: 'Good' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome', rating: 5, review: 'Excellent' },
  { id: 3, col1: 'MUI', col2: 'is Amazing', rating: 4, review: 'あ'.repeat(1000) },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
  { field: 'rating', headerName: '評価', width: 150 },
  { field: 'review', headerName: '口コミ', width: 500, sortable: false },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}

function App() {
  const [status, setStatus] = React.useState<FooterStatus>('connected');

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
            footer: CustomFooterStatusComponent,
          }}
          slotProps={{
            footer: { status },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <br/>
        <Button
          variant="contained"
          onClick={() =>
            setStatus((current) =>
              current === 'connected' ? 'disconnected' : 'connected',
            )
          }
        >
          {status === 'connected' ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
