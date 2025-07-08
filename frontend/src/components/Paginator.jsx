import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SimplePaginator({ pages, page, keyword = '', isAdmin = false }) {
    return (
        <div>
            <Pagination>
                {[...Array(pages).keys()].map(x => (
                    <Pagination.Item
                        key={x + 1}
                        active={x + 1 === page}
                        as={Link}
                        to={ isAdmin ? `/admin/products/?keyword=${keyword}&page=${x + 1}` :
                            `/?keyword=${keyword}&page=${x + 1}`}
                    >
                        {x + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}



const Paginator = ({ pages, page, keyword = '', isAdmin = false }) => {
    return (
        <div>
            {/* <AdvancedPaginator pages={pages} page={page} keyword={keyword} /> */}
            <SimplePaginator pages={pages} page={page} keyword={keyword} isAdmin={isAdmin} />
        </div>
    )
}



export default Paginator
