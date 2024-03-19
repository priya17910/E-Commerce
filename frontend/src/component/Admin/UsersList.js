import React, { Fragment, useEffect, useState } from 'react';
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core';
import MetaData from '../layout/MetaData';
import {
    MdEdit,
    MdDelete
} from 'react-icons/md';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, users} = useSelector((state) => state.allUsers);
    const {error: deleteUserError, isDeleted, message} = useSelector((state) => state.profile);
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };


    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteUserError)
        {
            alert.error(deleteUserError);
            dispatch(clearErrors());
        }
        if (isDeleted)
        {
            alert.success(message);
            navigate("/admin/users");
            dispatch({
                type: DELETE_USER_RESET,
            });
        }
        dispatch(getAllUsers());
    }, [dispatch, alert, error, navigate, deleteUserError, isDeleted, message]);
    const columns =[
        {
            field: "id",
            headerName: "User ID",
            minWidth: 180,
            flex: 0.8,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
            renderCell: (cellValues) => {
                const val = cellValues?.value;
                if (val === 'user')
                {
                    return (
                        <div style={{color: "red"}}>{val}</div>
                    );
                }
                if (val === 'admin')
                {
                    return (
                        <div style={{color: "green"}}>{val}</div>
                    );
                }
            }
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const id = params.getValue(params.id, "id");
                // {`/admin/product/${id}`}
                return (
                    <Fragment>
                        <Link to={`/admin/user/${id}`} style={{cursor: 'pointer'}}>
                            <MdEdit />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            }
        },
    ];

    const rows =[];


    users && users.forEach((item1) => {
        rows.push({
        id: item1._id,
        role: item1.role,
        email: item1.email,
        name: item1.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id="productListHeading">
                        ALL USERS
                    </h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default UsersList;