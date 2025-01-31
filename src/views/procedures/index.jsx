import React from 'react';
import { Box } from '@chakra-ui/react';
import ProceduresTable from './components/ProceduresTable';

const Procedures = () => {
  const proceduresData = [
    {
      id: 1,
      code: 'D512',
      name: 'John Doe',
      cost: '100',
      added_by: 'Unknown',
      added_at: '1/12/2025',
    },
  ];

  return (
    <Box pt={{ base: '80px', md: '80px', xl: '80px' }}>
      <ProceduresTable proceduresData={proceduresData} />{' '}
    </Box>
  );
};

export default Procedures;
