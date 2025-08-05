import { PAGE_SIZE } from '@/common/constants'
import Pagination from '@mui/material/Pagination'
import { ChangeEvent } from 'react'

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const paginationCount = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 0
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Pagination
      count={paginationCount}
      page={page}
      color="primary"
      onChange={changePage}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        visibility: paginationCount >= 2 ? 'visible' : 'hidden',
      }}
    />
  )
}
