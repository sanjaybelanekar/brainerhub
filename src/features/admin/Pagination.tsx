import React from "react";
import Paginations from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IPaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: any;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) => {
  let totalPages = 1;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    totalPages = i;
  }

  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Stack>
        <Paginations
          sx={{ display: "flex", justifyContent: "center" }}
          count={totalPages}
          color="primary"
          defaultPage={1}
          size="large"
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </>
  );
};

export default Pagination;
