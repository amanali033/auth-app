import React from 'react';
import { Box } from '@chakra-ui/react';
import LocationTable from './components/LocationTable';

const Location = () => {
  const locationData = [
    {
      name: "John Doe",
      address: "123 Main St, Springfield",
      state: "Illinois",
      postalCode: "12345",
    },
    {
      name: "Jane Smith",
      address: "456 Elm St, Metropolis",
      state: "New York",
      postalCode: "23456",
    },
    {
      name: "Emily Johnson",
      address: "789 Oak St, Gotham",
      state: "California",
      postalCode: "34567",
    },
    {
      name: "Michael Brown",
      address: "321 Pine St, Star City",
      state: "Texas",
      postalCode: "45678",
    },
    {
      name: "Sarah Wilson",
      address: "654 Cedar St, Central City",
      state: "Florida",
      postalCode: "56789",
    },
    {
      name: "David Lee",
      address: "987 Maple St, Coast City",
      state: "Washington",
      postalCode: "67890",
    },
    {
      name: "Sophia Martinez",
      address: "246 Birch St, Blüdhaven",
      state: "Oregon",
      postalCode: "78901",
    },
  ];
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <LocationTable locationData={locationData} />{' '}
    </Box>
  );
};

export default Location;
