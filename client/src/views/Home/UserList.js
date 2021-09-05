import React, { useEffect, useState } from 'react'
// import User from './User'
import DataTable from "react-data-table-component";


const UserList = ({ userList }) => {

    const [columns, setColumns] = useState([])
    useEffect(() => {
        const lists = [
            {
                name: "Name",
                selector: "fullName",
                sortable: true,
                minWidth: "140px",
                maxWidth: "220px",
                cell: (row) => (
                    <span
                        title={row.fullName && row.fullName}
                        className="text-truncate text-bold-500 mb-0 font-weight-bolder"
                    >
                        {row.fullName ? row.fullName : "-"}
                    </span>
                ),
            },
            {
                name: "Role",
                selector: "role",
                sortable: true,
                minWidth: "140px",
                maxWidth: "220px",
                cell: (row) => (
                    <span
                        title={row.role && row.role}
                        className="text-truncate text-bold-500 mb-0 font-weight-bolder"
                    >
                        {row.role ? row.role : "-"}
                    </span>
                ),
            },
            {
                name: "Status",
                selector: "status",
                sortable: true,
                minWidth: "140px",
                maxWidth: "220px",
                cell: (row) => (
                    <span
                        title={row.status && row.status}
                        className="text-truncate text-bold-500 mb-0 font-weight-bolder"
                    >
                        {row.status ? row.status : "-"}
                    </span>
                ),
            },
        ]

        setColumns(lists)

    }, [userList])
    return (
        <div className="userList">
            <DataTable
                columns={columns}
                data={userList && userList.length ? userList : []}
                // pagination
                // paginationServer
                noHeader
                subHeader
                selectableRows
                responsive
                pointerOnHover
            />
            {/* {userList && userList.length > 0 && userList.map(user => <User user={user} key={user._id} />)} */}
        </div>
    )
}

export default UserList
