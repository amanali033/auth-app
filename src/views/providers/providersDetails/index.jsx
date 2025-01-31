import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Select,
  SimpleGrid,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import Card from 'components/card/Card';
import BackButton from 'components/BackButton';
import { MdEdit } from 'react-icons/md';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ProvidersTable from '../components/ProvidersTable';

const locationData = [
  {
    name: 'John Doe',
    email: 'xyz@gmail.com',
    phone: '123456789',
    designation: 'Staff',
  },
];

const columnHelper = createColumnHelper();

export default function ProvidersDetails(props) {
  const { ...rest } = props;
  // Columns definition
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          NAME
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Email
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Phone
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('designation', {
      id: 'designation',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Designation
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          ACTION
        </Text>
      ),
      cell: (info) => {
        const handleEditClick = (e) => {
          onOpen();
          setType('edit');
        };

        return (
          <Box display="flex">
            <IconButton
              icon={<MdEdit style={{ marginLeft: '-1px' }} />}
              aria-label="Edit Details"
              colorScheme="brand"
              size="sm"
              mr="6px"
              onClick={handleEditClick}
            />
          </Box>
        );
      },
    }),
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = React.useState('add');
  const [sorting, setSorting] = React.useState([]);
  const [data, setData] = React.useState(() => [...locationData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [isEnabled, setIsEnabled] = useState(true); // For status toggle

  const handleStatusChange = () => {
    setIsEnabled(!isEnabled); // Toggle between enabled and disabled
  };

  const [currentRole, setCurrentRole] = useState('Staff');
  const [currentStatus, setCurrentStatus] = useState('Active');

  useEffect(() => {
    setCurrentStatus(isEnabled === true ? 'Active' : 'Inactive');
  }, [isEnabled]);
  const handleRoleChange = (event) => {
    setCurrentRole(event.target.value);
  };

  const handleResetPassword = () => {
    // Logic for resetting password goes here (e.g., open modal or API call)
    alert('Password reset logic goes here.');
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <BackButton />
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1fr 1fr',
        }}
        templateRows={{
          base: 'repeat(2, 1fr)',
          lg: '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="8px"
            mb="24px"
          >
            Location Details
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Display Clinic Information */}
            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Name:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                Irving Park Family Dentist
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Address:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                3435 W Irving Park Rd, Chicago IL
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                State:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                Illinois
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Postal Code :
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                60618
              </Text>
            </Box>
          </SimpleGrid>
        </Card>
        <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="8px"
            mb="24px"
          >
            Staff Members for This Location
          </Text>
          <Box overflowX="auto">
            <Table variant="striped" color="gray.500" mb="24px" mt="12px">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        pe="10px"
                        borderColor={borderColor}
                        cursor="pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Flex justifyContent="space-between" align="center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, 11) // You can remove slice to show all rows
                  .map((row) => (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <Td
                          key={cell.id}
                          fontSize="14px"
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      ))}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </Grid>
      <ProvidersTable isOpen={isOpen} onClose={onClose} type={type} />
    </Box>
  );
}
