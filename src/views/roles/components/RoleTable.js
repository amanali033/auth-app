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
import LocationModal from './RoleModal';

// Column Helper
const columnHelper = createColumnHelper();

// TeamTable Component
export default function RoleTable(props) {
  const { rolesData } = props;
  const navigate = useNavigate();
  const [type, setType] = React.useState('add');
  const [selectedLocation, setSelectedLocation] = React.useState(null);
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

    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          ROLE NAME
        </Text>
      ),
      cell: (info) => {
        const role = info.getValue();
        const roleColors = {
          Admin: 'red',
          Lab: 'blue',
          Staff: 'green',
          // default: "gray.500",
        };

        return (
          <Badge
            colorScheme={roleColors[role] || 'gray'}
            px={2}
            py={1.5}
            borderRadius="md"
            textAlign="center"
            minWidth="60px"
          >
            <Text fontSize="sm" textTransform="capitalize" fontWeight="700">
              {role}
            </Text>
          </Badge>
        );
      },
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
            minWidth="60px"
          >
            <Text fontSize="sm" textTransform="capitalize" fontWeight="700">
              {role}
            </Text>
          </Badge>
        );
      },
    }),

    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Created At
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('updated_at', {
      id: 'updated_at',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Updated At
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),

  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState(() => [...rolesData]);
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
            Clinic Roles

          </Text>

          <Box
            ml={{ base: 0, md: 'auto' }}
            mr={{ base: 0, md: 5 }}
            w={{ base: '100%', md: 'auto' }}
          >
            <SearchBar />
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
              Create New Role
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
      <LocationModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        initialData={selectedLocation}
      />
    </>
  );
}
