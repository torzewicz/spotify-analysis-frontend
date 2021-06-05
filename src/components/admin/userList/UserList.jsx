import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiTableHead from "@material-ui/core/TableHead"
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorAlert from "../../analysis/generic/feedback/alerts/ErrorAlert";
  
const TableHead = withStyles(({
    root: {
        backgroundColor: '#757de8'
    }
}))(MuiTableHead);
  
const TableHeaderCell = withStyles(({
    root: {
        color: 'white',
        fontWeight: 700
    }
}))(TableCell);

const UserList = () => {
    const [usersData, setUsersData] = useState([]);
    const [error, setError] = useState(null)
    const {accessToken} = useSelector(state => state.logIn);

    const fetchUsers = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(({data}) => {
            setUsersData(data);
            setError(null)
        })
        .catch(err => {
            setError(err);
        })
    }

    useEffect(() => {
        if (accessToken) {
            fetchUsers()
        }
    }, [accessToken])

    const onDeleteButtonClicked = (user) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                username: user.username
            }
        })
        .then(() => {
            const newUsersData = usersData.map(value => value);
            const index = newUsersData.findIndex(value => value.id === user.id);
            newUsersData[index].enabled = false;
            setUsersData(newUsersData)
        })
        .catch(err => {
            setError(err);
        })
    }

    return (
        <div>
            <div style={{
                display: 'flex', 
                justifyContent: 'center',
                marginBottom: 10
            }}>
                <ErrorAlert error={error}/>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <TableContainer component={Paper} style={{maxWidth: 1200}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Username</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell width="100">Role</TableHeaderCell>
                                <TableHeaderCell width="50">Connected</TableHeaderCell>
                                <TableHeaderCell width="50">Verified</TableHeaderCell>
                                <TableHeaderCell width="50">Enabled</TableHeaderCell>
                                <TableHeaderCell width="50">Actions</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{Boolean(user.connected).toString()}</TableCell>
                                    <TableCell>{Boolean(user.verified).toString()}</TableCell>
                                    <TableCell>{Boolean(user.enabled).toString()}</TableCell>
                                    <TableCell style={{display: 'flex', justifyContent: 'center'}}>
                                        <IconButton 
                                            disabled={!user.enabled}
                                            size='small' 
                                            onClick={() => onDeleteButtonClicked(user)}
                                            style={{color: user.enabled ? 'red' : 'gray'}}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default UserList; 