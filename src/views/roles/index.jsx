import React from 'react';
import { Box } from '@chakra-ui/react';
import LocationTable from './components/RoleTable';
import RoleTable from './components/RoleTable';

const Role = () => {
  const rolesData = [
    {
      role: 'Admin',
      status: 'Active',
      created_at: '1/15/2024',
      updated_at: '1/15/2025',
    },
    {
      role: 'Staff',
      status: 'Inactive',
      created_at: '1/15/2024',
      updated_at: '1/15/2025',
    },
    {
      role: 'Lab',
      status: 'Inactive',
      created_at: '1/15/2024',
      updated_at: '1/15/2025',
    },
  ];
  return (
    <Box pt={{ base: '80px', md: '80px', xl: '80px' }}>
      <RoleTable rolesData={rolesData} />{' '}
    </Box>
  );
};

export default Role;
