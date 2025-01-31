import React from 'react';
import { Box } from '@chakra-ui/react';
import ProvidersTable from './components/ProvidersTable';

const Providers = () => {
  const providersData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      designation: 'Manager',
      state: 'Illinois',
      postalCode: '60618',
      NPI: '1234567890',
      TIN: '12-3456789',
      stateID: 'IL12345',
      status: 'Enable',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      designation: 'Developer',
      state: 'California',
      postalCode: '90001',
      NPI: '0987654321',
      TIN: '98-7654321',
      stateID: 'CA67890',
      status: 'Enable',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicej@example.com',
      phone: '456-789-0123',
      designation: 'Designer',
      state: 'Texas',
      postalCode: '73301',
      NPI: '2345678901',
      TIN: '23-4567890',
      stateID: 'TX12345',
      status: 'Disabled',
    },
    {
      id: 4,
      name: 'Bob Williams',
      email: 'bobw@example.com',
      phone: '321-654-0987',
      designation: 'Analyst',
      state: 'Florida',
      postalCode: '33101',
      NPI: '3456789012',
      TIN: '34-5678901',
      stateID: 'FL67890',
      status: 'Enable',
    },
  ];

  return (
    <Box pt={{ base: '80px', md: '80px', xl: '80px' }}>
      <ProvidersTable providersData={providersData} />{' '}
    </Box>
  );
};

export default Providers;
