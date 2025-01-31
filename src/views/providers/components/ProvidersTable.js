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
import { ProvidersModal } from './ProvidersModal';


// Column Helper
const columnHelper = createColumnHelper();

// TeamTable Component
export default function ProvidersTable(props) {
  const { providersData } = props;
  const navigate = useNavigate();
  const [type, setType] = React.useState('add');
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [statusFilter, setStatusFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Columns definition
  const columns = [
    columnHelper.accessor((row, index) => index + 1, {
      id: '#',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          #
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
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

    columnHelper.accessor('NPI', {
      id: 'NPI',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          NPI #
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('TIN', {
      id: 'TIN',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          TIN #
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('stateID', {
      id: 'stateID',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          state ID
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
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
          Enable: 'green',
          Disabled: 'red',
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
    columnHelper.accessor('updateStatus', {
      id: 'updateStatus',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Update Status
        </Text>
      ),
      cell: (info) => {
        const handleStatusChange = (rowIndex) => {
          setData((prevData) =>
            prevData.map((row, index) =>
              index === rowIndex
                ? { ...row, status: row.status === 'Enable' ? 'Disabled' : 'Enable' }
                : row
            )
          );
        };

        const rowIndex = info.row.index; // Get the row index
        const isChecked = data[rowIndex]?.status === 'Enable'; // Check status

        return (
          <Switch
            isChecked={isChecked}
            onChange={() => handleStatusChange(rowIndex)}
            colorScheme="brand"
          />
        );
      },
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
  const [data, setData] = React.useState(() => [...providersData]);
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

  const totalItems = 100;
  const itemsPerPageOptions = [10, 20, 30, 50];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
        <Flex
          px={{ base: '12px', md: '25px' }}
          mb="8px"
          justifyContent="space-between"
          align="center"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 0 }}
          w="100%"
        >
          <Text
            color={textColor}
            fontSize="24px"
            fontWeight="700"
            lineHeight="100%"
            mb={{ base: '8px', md: '0px' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Clinic Providers{' '}
          </Text>

          <Box
            ml={{ base: 0, md: 'auto' }}
            mr={{ base: 0, md: 5 }}
            w={{ base: '100%', md: 'auto' }}
          >
            <SearchBar />
          </Box>
          <Box
            mr={{ base: 0, md: 5 }}
            w={{ base: '100%', md: 'auto' }}
          >
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              width="100%"
              maxW={{ base: '100%', md: '200px' }}
              borderRadius="16px"
            >
              <option value="" disabled>
                Filter by status
              </option>

              <option value="enable" >
                Enable
              </option>
              <option value="disable" >
                Disable
              </option>
            </Select>
          </Box>

          <Box w={{ base: '100%', md: 'auto' }}>
            <Button
              w="100%"
              minW={{ base: 'auto', md: '140px' }}
              variant="brand"
              fontWeight="500"
              onClick={() => {
                onOpen();
                setType('add');
              }}
            >
              Create Provider
            </Button>
          </Box>
        </Flex>

        <Flex
          px={{ base: '12px', md: '25px' }}
          mb="8px"
          justifyContent="space-between"
          align="center"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 0 }}
          w="100%"
        >
          <Box w={{ base: '100%', md: 'auto' }}>
            <Select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              width="100%"
              maxW="200px"
              borderRadius="16px"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </Select>
          </Box>

          <Box
            w={{ base: '100%', md: 'auto' }}
            textAlign={{ base: 'center', md: 'right' }}
          >
            <Pagination totalItems={200} onPageChange={handlePageChange} />
          </Box>
        </Flex>

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
                        whiteSpace="nowrap"
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
      <ProvidersModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        initialData={selectedLocation}
      />
    </>
  );
}
