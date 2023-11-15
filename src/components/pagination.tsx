export const Pagination = ({table}) =>{
    return(
        <div className="flex items-center justify-center gap-2 mt-4 flex-col">
               <div>
               <button
                    className="border rounded py-2 px-4 text-dark-bg bg-dark-bg-lite font-bold"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}>
                    {'<<'}
                </button>
                <button
                    className="border rounded py-2 px-4 mx-2 text-dark-bg bg-dark-bg-lite font-bold"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    {'<'}
                </button>
                <button
                    className="border rounded py-2 px-4 mx-2 text-dark-bg bg-dark-bg-lite font-bold"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    {'>'}
                </button>
                <button
                    className="border rounded py-2 px-4 text-dark-bg bg-dark-bg-lite font-bold"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    {'>>'}
                </button>
               </div>
                <span className="flex items-center gap-1 text-dark-bg-text">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                
            </div>
    )
}


