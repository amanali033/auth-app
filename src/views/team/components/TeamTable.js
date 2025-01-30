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
import { MdCheckCircle, MdOutlineError, MdPending, MdVisibility } from 'react-icons/md';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';

// Column Helper
const columnHelper = createColumnHelper();

// TeamTable Component
export default function TeamTable(props) {
    const { tableData } = props;
    const navigate = useNavigate()
    const [sorting, setSorting] = React.useState([]);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    // const primaryTextColor = useColorModeValue('brand.600', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

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
                    EMAIL
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('requestStatus', {
            id: 'requestStatus',
            header: () => (
                <Text fontSize="12px" color="gray.400" fontWeight="bold">
                    REQUEST STATUS
                </Text>
            ),
            cell: (info) => (
                <Flex align="center">
                    <Icon
                        w="24px"
                        h="24px"
                        me="5px"
                        color={
                            info.getValue() === 'Accepted'
                                ? 'green.500'
                                : info.getValue() === 'Pending'
                                    ? 'yellow.500'
                                    : info.getValue() === 'NA'
                                        ? 'orange.500'
                                        : null
                        }
                        as={
                            info.getValue() === 'Accepted'
                                ? MdCheckCircle
                                : info.getValue() === 'Pending'
                                    ? MdPending
                                    : info.getValue() === 'NA'
                                        ? MdOutlineError
                                        : null
                        }
                    />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue()}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor('role', {
            id: 'role',
            header: () => (
                <Text fontSize="12px" color="gray.400" fontWeight="bold">
                    ROLE
                </Text>
            ),
            cell: (info) => {
                const role = info.getValue();
                const roleColors = {
                    Admin: "red",
                    Lab: "blue",
                    Staff: "green",
                    // default: "gray.500",
                };

                return (
                    <Badge colorScheme={roleColors[role] || "gray"} px={2} py={1.5} borderRadius="md" textAlign="center" minWidth="60px">
                        <Text fontSize="sm" textTransform="capitalize" fontWeight="700">{role}</Text>
                    </Badge>
                );
            },
        }),
        columnHelper.accessor('userStatus', {
            id: 'userStatus',
            header: () => (
                <Text fontSize="12px" color="gray.400" fontWeight="bold">
                    USER STATUS
                </Text>
            ),
            cell: (info) => {
                const role = info.getValue();
                const roleColors = {
                    Enable: "green",
                    Disabled: "red",
                };

                return (
                    <Badge colorScheme={roleColors[role] || "gray"} px={2} py={1.5} borderRadius="md" textAlign="center" minWidth="72px">
                        <Text fontSize="sm" textTransform="capitalize" fontWeight="700">{role}</Text>
                    </Badge>
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
                const handleViewClick = () => {
                    navigate("details")
                };

                return (
                    <IconButton
                        icon={<MdVisibility style={{ marginLeft: "-1px" }} />}
                        aria-label="View Details"
                        colorScheme="blue"
                        size="sm"
                        onClick={handleViewClick}
                    />
                );
            },
        }),
    ];

    const [data, setData] = React.useState(() => [...tableData]);
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

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
            <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    Team Members
                </Text>
                <Box>

                    <SearchBar />
                    {/* <Menu /> */}
                    {/* <Pagination /> */}
                </Box>
            </Flex>
            <Box>
                <Table variant="simple" color="gray.500" mb="24px" mt="12px">
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
                                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
}
