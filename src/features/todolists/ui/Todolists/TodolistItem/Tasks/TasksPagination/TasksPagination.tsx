import { PAGE_SIZE } from '@/common/constants'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        color="primary"
        onChange={changePage}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
      <div>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </div>
    </>
  )
}
