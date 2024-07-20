import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
  },
});

export default function PaginationControlled({ page, handlePageChange, count }) {
    return (
        <ThemeProvider theme={theme}>
            <div className='text-white'>
                <Pagination 
                    count={count} 
                    page={page} 
                    onChange={handlePageChange}
                />
            </div>
        </ThemeProvider>
    );
}