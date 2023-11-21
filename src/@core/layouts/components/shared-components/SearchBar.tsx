import React, { useState, useEffect } from "react";
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// ** SearchBar
import {

    InputAdornment,
    TextField,
} from "@material-ui/core";

const SearchBar = () => {

    const theme = useTheme()

    const [showClearIcon, setShowClearIcon] = useState("none");
    const [openSearchBars, setOpenSearchBar] = useState(false)
    const [studentBasicInfo, setStudentBasicInfo] = useState<any>([])

    useEffect(() => {
        const studentBasic = localStorage.getItem('studentBasicInfo')
        if (studentBasic) {
            setStudentBasicInfo(JSON.parse(studentBasic))
        }
    }, [])




    const handleClick = () => {

        // TODO: Clear the search input
        setOpenSearchBar(false)
        console.log("clicked the clear icon...");
    };

    const searchBars = () => {
        setOpenSearchBar(true)
    }

    const handleChange = (e: any) => {
        const value = e.target.value
        const data = studentBasicInfo.filter((e: any, index: number) => {
            if (e.studentFirstName.includes(value) || e.studentLastName.includes(value)
                || e.studentContact.includes(value) || e.studentEmail.includes(value)
                || e.studentEnrollmentNumber.includes(value)
            ) {
                return e;
            }
        })
        console.log(data, "checkDetails")
    }

    return (
        <div style={{ paddingLeft: '10px' }}>
            <IconButton onClick={searchBars}>
                <Icon color="dark-gray" icon="tabler:search" />
            </IconButton>
            {openSearchBars &&
                <Dialog
                    open={openSearchBars}
                    onClose={handleClick}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    style={{
                        backdropFilter: 'blur(5px)',
                        paddingBottom: '200px'
                    }}
                >
                    <DialogTitle id='alert-dialog-title'>
                        <TextField
                            placeholder="Search.."
                            fullWidth
                            onChange={(event) => {
                                setShowClearIcon(event.target.value === "" ? "none" : "flex");
                                handleChange(event)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <Icon icon="system-uicons:search" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{ display: showClearIcon, cursor: 'pointer' }}
                                        onClick={handleClick}
                                    >
                                        <Icon icon="bx:x" />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                        <DialogContentText id='alert-dialog-description'>
                            No data found
                        </DialogContentText>
                    </DialogContent>
                </Dialog>}
        </div>
    )
}

export default SearchBar
