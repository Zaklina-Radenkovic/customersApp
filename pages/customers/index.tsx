import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Plus as PlusIcon } from "../../src/icons/plus";
import { Search as SearchIcon } from "../../src/icons/search";
import { ListTable } from "../../src/components/customer/ListTable";
import { DocumentData } from "firebase/firestore";
import { getCustomersAndDocuments } from "../../src/lib/firebase";

export type Customer = {
  address: string;
  email: string;
  phone: string;
  name: string;
  id: string;
  avatar: string;
  photoURL: string;
};

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
];

//for tabs
const applyFilters = (customers: Customer[], query: string) =>
  customers.filter((customer) => {
    if (query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          customer[property as keyof Customer]
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    return true;
  });

const descendingComparator = (a: string, b: string, sortBy: number) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.
  if (b[sortBy] < a[sortBy]) {
    return -1;
  }
  if (b[sortBy] > a[sortBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (sortDir: string, sortBy: number) =>
  sortDir === "desc"
    ? (a: string, b: string) => descendingComparator(a, b, sortBy)
    : (a: string, b: string) => -descendingComparator(a, b, sortBy);

const applySort = (customers: Customer[], sort: string) => {
  const [sortBy, sortDir]: any[] = sort.split("|");
  const comparator = getComparator(sortDir, sortBy);

  const stabilizedThis = customers.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);
    if (newOrder !== 0) {
      return newOrder;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (
  customers: Customer[],
  page: number,
  rowsPerPage: number
) => customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const CustomerList = () => {
  const queryRef = useRef<any | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    // calling 'async' fnc inside of useeffect
    const getCustomersMap = async () => {
      const data: DocumentData = await getCustomersAndDocuments("customers");
      //@ts-ignore
      const customersArr = data.reduce((acc, user: any) => {
        //{}[]
        const customer = {
          ...user,
          name: user.displayName || user.name,
          avatar: user.avatar || user.photoURL,
          id: user.uid || user.id,
          city: user.city || "-",
          country: user.country || "-",
        };
        acc.push(customer);
        return acc;
      }, []);
      // console.log(customersArr);
      setCustomers(customersArr);
    };
    getCustomersMap();
  }, []);

  const handleQueryChange = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setQuery(queryRef.current?.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const filteredCustomers = applyFilters(customers, query);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(
    sortedCustomers,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>CustomersApp | Customers List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Customers</Typography>
              </Grid>
              {/* <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid> */}
            </Grid>
          </Box>
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search customers"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <ListTable
              customers={paginatedCustomers}
              customersCount={filteredCustomers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
