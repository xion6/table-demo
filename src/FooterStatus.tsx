import * as React from 'react';
import Box from '@mui/material/Box';
import { GridSlotsComponentsProps } from '@mui/x-data-grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export type FooterStatus = 'connected' | 'disconnected';

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    status: FooterStatus;
  }
}

export function CustomFooterStatusComponent(
    props: NonNullable<GridSlotsComponentsProps['footer']>,
  ) {
    const [status, setStatus] = React.useState<FooterStatus>('connected');
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <FiberManualRecordIcon
          fontSize="small"
          sx={{
            mr: 1,
            color: props.status === 'connected' ? '#4caf50' : '#d9182e',
          }}
        />
        Status {props.status}
      </Box>
    );
  }