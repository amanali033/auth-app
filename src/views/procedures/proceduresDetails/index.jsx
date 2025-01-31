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
import { ProceduresModal } from '../components/ProceduresModal';
import DeleteModal from 'components/deleteModal/DeleteModal';

const columnHelper = createColumnHelper();

// Data for Options and Procedure Steps
const optionsData = [
  { optionName: 'Option 1', additionalCost: 20 },
  { optionName: 'Option 2', additionalCost: 30 },
];

const procedureStepsData = [
  {
    stepNumber: 1,
    stepName: 'Step 1',
    description: 'Description 1',
    price: 50,
    dateCreated: '1/15/2025',
  },
  {
    stepNumber: 2,
    stepName: 'Step 2',
    description: 'Description 2',
    price: 60,
    dateCreated: '1/15/2025',
  },
];

export default function ProceduresDetails(props) {
  const { ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // Options Table Columns
  const optionsColumns = [
    columnHelper.accessor('optionName', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Option Name
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('additionalCost', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Additional Cost
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          ${info.getValue()}
        </Text>
      ),
    }),
  ];

  // Procedure Steps Table Columns
  const procedureStepsColumns = [
    columnHelper.accessor('stepNumber', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Step Number
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('stepName', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Step Name
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('description', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Description
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('price', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Price
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          ${info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('dateCreated', {
      header: () => (
        <Text fontSize="12px" color="gray.400" fontWeight="bold">
          Date Created
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
  ];

  // React Table instance for Options
  const optionsTable = useReactTable({
    data: optionsData,
    columns: optionsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // React Table instance for Procedure Steps
  const procedureStepsTable = useReactTable({
    data: procedureStepsData,
    columns: procedureStepsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = React.useState('add');

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const handleEditClick = (e) => {
    onOpen();
    setType('edit');
  };

  const handleDeleteItem = () => {
    // Perform your delete logic here, e.g., API call to delete the item
    console.log('Item deleted!');
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
            Complete Denture – Maxillary{' '}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Display Clinic Information */}
            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Code:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                D5110
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                D5110:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                $145.00
              </Text>
            </Box>
          </SimpleGrid>
          <SimpleGrid my={5}>
            <Box border="1px solid #E3E7EA" p={4} mb={5} borderRadius="16px">
              <Text fontWeight="semibold" color={textColorPrimary}>
                Options:
              </Text>
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
            </Box>

            {/* Procedure Steps Table */}
            <Box border="1px solid #E3E7EA" p={4} borderRadius="16px">
              <Text fontWeight="semibold" color={textColorPrimary}>
                Procedure Steps:
              </Text>
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
            </Box>
          </SimpleGrid>
          <Box display="flex" justifyContent="flex-end">
            <Button
              minW={{ base: 'auto', md: '140px' }}
              variant="brand"
              fontWeight="500"
              mr={4}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              minW={{ base: 'auto', md: '140px' }}
              colorScheme="red"
              fontWeight="500"
              onClick={handleOpenDeleteModal}
            >
              Delete
            </Button>
          </Box>
        </Card>
      </Grid>
      <ProceduresModal isOpen={isOpen} onClose={onClose} type={type} />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteItem}
        itemId="123" // Item name to be deleted
      />
    </Box>
  );
}
