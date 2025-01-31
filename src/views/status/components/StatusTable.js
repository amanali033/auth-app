import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
  Badge,
  IconButton,
  Select,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Switch,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import {
  MdCheckCircle,
  MdEdit,
  MdOutlineError,
  MdPending,
  MdVisibility,
} from 'react-icons/md';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import LocationModal from './StatusModal';

// Column Helper
const columnHelper = createColumnHelper();
// Data for Options and Procedure Steps
const labData = [
  { id: 1, name: 'Lab A', status: 'Active', createdBy: 'John Doe', createdAt: '2025-01-01' },
  { id: 2, name: 'Lab B', status: 'Inactive', createdBy: 'Jane Smith', createdAt: '2025-01-02' },
  { id: 3, name: 'Lab C', status: 'Active', createdBy: 'Alice Brown', createdAt: '2025-01-03' },
  { id: 4, name: 'Lab D', status: 'Inactive', createdBy: 'Bob White', createdAt: '2025-01-04' },
  { id: 5, name: 'Lab E', status: 'Inactive', createdBy: 'Charlie Green', createdAt: '2025-01-05' },
  { id: 6, name: 'Lab F', status: 'Active', createdBy: 'David Blue', createdAt: '2025-01-06' },
  { id: 7, name: 'Lab G', status: 'Active', createdBy: 'Emma Black', createdAt: '2025-01-07' },
  { id: 8, name: 'Lab H', status: 'Active', createdBy: 'Fiona Purple', createdAt: '2025-01-08' },
  { id: 9, name: 'Lab I', status: 'Inactive', createdBy: 'George Yellow', createdAt: '2025-01-09' },
  { id: 10, name: 'Lab J', status: 'Inactive', createdBy: 'Hannah Red', createdAt: '2025-01-10' },
];

const batchData = [
  { id: 1, name: 'Batch 1', status: 'Inactive', createdBy: 'John Doe', createdAt: '2025-01-01', action: 'View/Edit' },
  { id: 2, name: 'Batch 2', status: 'Active', createdBy: 'Jane Smith', createdAt: '2025-01-02', action: 'View/Edit' },
  { id: 3, name: 'Batch 3', status: 'Active', createdBy: 'Alice Brown', createdAt: '2025-01-03', action: 'View/Edit' },
  { id: 4, name: 'Batch 4', status: 'Inactive', createdBy: 'Bob White', createdAt: '2025-01-04', action: 'View/Edit' },
  { id: 5, name: 'Batch 5', status: 'Active', createdBy: 'Charlie Green', createdAt: '2025-01-05', action: 'View/Edit' },
  { id: 6, name: 'Batch 6', status: 'Inactive', createdBy: 'David Blue', createdAt: '2025-01-06', action: 'View/Edit' },
  { id: 7, name: 'Batch 7', status: 'Active', createdBy: 'Emma Black', createdAt: '2025-01-07', action: 'View/Edit' },
  { id: 8, name: 'Batch 8', status: 'Inactive', createdBy: 'Fiona Purple', createdAt: '2025-01-08', action: 'View/Edit' },
  { id: 9, name: 'Batch 9', status: 'Active', createdBy: 'George Yellow', createdAt: '2025-01-09', action: 'View/Edit' },
  { id: 10, name: 'Batch 10', status: 'Inactive', createdBy: 'Hannah Red', createdAt: '2025-01-10', action: 'View/Edit' },
];



// TeamTable Component
export default function StatusTable(props) {
  const { statusData } = props;

  // Options Table Columns
  const labColumns = [
    columnHelper.accessor('name', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Name
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Status
        </Text>
      ),
      cell: (info) => {
        const role = info.getValue();
        const roleColors = {
          Active: 'green',
          Inactive: 'red',
        };

        return (
          <Badge
            colorScheme={roleColors[role] || 'gray'}
            px={2}
            py={1.5}
            borderRadius="md"
            textAlign="center"
            minWidth="72px"
          >
            <Text fontSize="sm" textTransform="capitalize" fontWeight="700">
              {role}
            </Text>
          </Badge>
        );
      },
    }),
    columnHelper.accessor('createdBy', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          created By
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('createdBy', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          created at
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('action', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Action
        </Text>
      ),
      cell: (info) => <Switch
        isChecked={true}
        // onChange={() => handleStatusChange(rowIndex)}
        colorScheme="brand"
      />,
    }),
  ];

  // Procedure Steps Table Columns
  const batchColumns = [
    columnHelper.accessor('name', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Name
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Status
        </Text>
      ),
      cell: (info) => {
        const role = info.getValue();
        const roleColors = {
          Active: 'green',
          Inactive: 'red',
        };

        return (
          <Badge
            colorScheme={roleColors[role] || 'gray'}
            px={2}
            py={1.5}
            borderRadius="md"
            textAlign="center"
            minWidth="72px"
          >
            <Text fontSize="sm" textTransform="capitalize" fontWeight="700">
              {role}
            </Text>
          </Badge>
        );
      },
    }),
    columnHelper.accessor('createdBy', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          created By
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('createdBy', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          created at
        </Text>
      ),
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('action', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Action
        </Text>
      ),
      cell: (info) => <Switch
        isChecked={true}
        // onChange={() => handleStatusChange(rowIndex)}
        colorScheme="brand"
      />,
    }),
  ];

  // React Table instance for Options
  const optionsTable = useReactTable({
    data: labData,
    columns: labColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // React Table instance for Procedure Steps
  const procedureStepsTable = useReactTable({
    data: batchData,
    columns: batchColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  const navigate = useNavigate();
  const [type, setType] = React.useState('add');
  const [endpoint, setEndpoint] = React.useState('lab_case');
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');


  const onEditClick = (data) => {
    setType('edit');
    setSelectedLocation(data);
  };

  const onViewClick = (data) => {
    navigate('details');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();




  return (
    <>
      <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
        <Box p={{ base: "0px", md: "25px" }}>
          <Tabs variant="line" colorScheme="brand" isLazy borderRadius="20px" border={{ base: "0px", md: "2px solid #DEE2E6" }}>
            <TabList>
              <Tab py={2.5}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold">Lab Case Status</Tab>
              <Tab py={2.5}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold">Batch Status</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex
                  px={{ base: '12px', md: '25px' }}
                  mb="8px"
                  justifyContent="space-between"
                  align="center"
                  flexDirection={{ base: 'column', md: 'row' }}
                  gap={{ base: 2, md: 0 }}
                  w="100%"
                >
                  <Text color={textColor} fontSize="20px" fontWeight="700" lineHeight="100%">
                    Lab Case
                  </Text>
                  <Box w={{ base: '100%', md: 'auto' }}>
                    <Button
                      w="100%"
                      minW={{ base: 'auto', md: '140px' }}
                      variant="brand"
                      fontWeight="500"
                      onClick={() => {
                        onOpen();
                        setEndpoint("lab_case")
                        setType('add');
                      }}
                    >
                      Add Lab Case Status
                    </Button>
                  </Box>
                </Flex>
                <Box overflowX="auto">
                  <Table variant="striped" color="gray.500" mb="24px" mt="12px">
                    <Thead>
                      {optionsTable.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <Th
                              key={header.id}
                              colSpan={header.colSpan}
                              pe="10px"
                              borderColor={borderColor}
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
                      {optionsTable.getRowModel().rows.map((row) => (
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
              </TabPanel>

              <TabPanel>
                <Flex
                  px={{ base: '12px', md: '25px' }}
                  mb="8px"
                  justifyContent="space-between"
                  align="center"
                  flexDirection={{ base: 'column', md: 'row' }}
                  gap={{ base: 2, md: 0 }}
                  w="100%"
                >
                  <Text color={textColor} fontSize="20px" fontWeight="700" lineHeight="100%">
                    Batch
                  </Text>
                  <Box w={{ base: '100%', md: 'auto' }}>
                    <Button
                      w="100%"
                      minW={{ base: 'auto', md: '140px' }}
                      variant="brand"
                      fontWeight="500"
                      onClick={() => {
                        onOpen();
                        setEndpoint("batch")
                        setType('add');
                      }}
                    >
                      Add Batch Status
                    </Button>
                  </Box>
                </Flex>
                <Box overflowX="auto">
                  <Table variant="striped" color="gray.500" mb="24px" mt="12px">
                    <Thead>
                      {procedureStepsTable
                        .getHeaderGroups()
                        .map((headerGroup) => (
                          <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <Th
                                key={header.id}
                                colSpan={header.colSpan}
                                pe="10px"
                                borderColor={borderColor}
                              >
                                <Flex
                                  justifyContent="space-between"
                                  align="center"
                                >
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
                      {procedureStepsTable.getRowModel().rows.map((row) => (
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

      </Card >
      <LocationModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        endpoint={endpoint}
        initialData={selectedLocation}
      />
    </>
  );
}
