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
  MdDelete,
  MdEdit,
  MdOutlineError,
  MdPending,
  MdVisibility,
} from 'react-icons/md';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import { ProceduresModal } from './ProceduresModal';
import DeleteModal from 'components/deleteModal/DeleteModal';



// Column Helper
const columnHelper = createColumnHelper();

// TeamTable Component
export default function ProceduresTable(props) {
  const { proceduresData } = props;
  const navigate = useNavigate();
  const [type, setType] = React.useState('add');
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);


  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);


  const handleDeleteItem = () => {
    // Perform your delete logic here, e.g., API call to delete the item
    console.log('Item deleted!');
  };



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
    columnHelper.accessor('code', {
      id: 'code',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Code
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
          Procedure NAME
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('cost', {
      id: 'cost',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Cost
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('added_by', {
      id: 'added_by',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Added by
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('added_at', {
      id: 'added_at',
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Added at
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

        const handleViewClick = () => {
          navigate('details');
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
            <IconButton
              icon={<MdVisibility style={{ marginLeft: '-1px' }} />}
              aria-label="View Details"
              colorScheme="blackAlpha"
              size="sm"
              mr="6px"
              onClick={handleViewClick}
            />
            <IconButton
              icon={<MdDelete style={{ marginLeft: '-1px' }} />}
              aria-label="View Details"
              colorScheme="red"
              size="sm"
              onClick={handleOpenDeleteModal}
            />
          </Box>
        );
      },
    }),
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState(() => [...proceduresData]);
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
            Procedures

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
              Add New Procedure            </Button>
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

      <ProceduresModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        initialData={selectedLocation}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteItem}
        itemId="123" // Item name to be deleted
      />
    </>
  );
}
