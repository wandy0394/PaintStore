import { MetaData } from "../../models/pagination"

type Props = {
    metaData:MetaData
    onPageChange: (page: number) => void
}

export default function AppPagination(props:Props) {
    const {metaData, onPageChange} = props
    const {currentPage, pageSize, totalCount, totalPages} = metaData
    return (
        <div className='w-full h-full grid grid-cols-2'>
            <span className='h-full flex items-center'>
                Displaying {(currentPage-1)*pageSize + 1}-
                    {(currentPage*pageSize > totalCount) 
                        ? totalCount 
                        : currentPage*pageSize} of {totalCount} items
            </span>
            <div className="btn-group">
                {
                    Array.from(Array(totalPages).keys()).map(page=>{
                        return (
                            <button 
                                key={page}
                                className={`btn ${(page === (currentPage - 1))?'btn-active':''}` }
                                onClick={()=>onPageChange(page+1)}
                            >
                                {page+1}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}