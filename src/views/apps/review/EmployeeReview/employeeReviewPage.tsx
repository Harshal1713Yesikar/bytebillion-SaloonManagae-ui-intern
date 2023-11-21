// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'

import Divider from '@mui/material/Divider'

import TableRow from '@mui/material/TableRow'

import TableBody from '@mui/material/TableBody'

import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'
import { customDateFormat } from 'src/@core/utils/format'

// ** Icon Imports

// ** Third Party Imports

// ** Configs

// ** Types

// ** Custom Component Imports

interface Props {
    employeePersonalDetails: Function
    getEmployeeEducationDetails: Function
    employeeHighSchoolDetails: Function
    employeeHigherSecondarySchoolDetails: Function
    employeeUnderGraduationDetails: Function
    employeePostGraduationDetails: Function
    employeeBankDetails: Function
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
    borderBottom: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: `${theme.spacing(1)} !important`,
    paddingBottom: `${theme.spacing(1)} !important`
}))

const EmployeeReviewPage = (props: Props) => {
    // ** Props
    const {
        employeePersonalDetails,
        getEmployeeEducationDetails,
        employeeHighSchoolDetails,
        employeeHigherSecondarySchoolDetails,
        employeeUnderGraduationDetails,
        employeePostGraduationDetails,
        employeeBankDetails
    } = props

    // ** States

    useEffect(() => {
        console.log(employeePersonalDetails(), 'employeePersonalDetails')
        console.log(employeeHigherSecondarySchoolDetails(), 'employeeHigherSecondarySchoolDetails')
        console.log(employeeHighSchoolDetails(), 'employeeHighSchoolDetails')
        console.log(getEmployeeEducationDetails(), 'getEmployeeEducationDetails')
        console.log(employeeUnderGraduationDetails(), 'employeeUnderGraduationDetails')
        console.log(employeePostGraduationDetails(), 'employeePostGraduationDetails')
        console.log(employeeBankDetails(), 'employeeBankDetails')
    }, [])

    // ** Hook
    const theme = useTheme()

    return (
        <Card>
            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    <Typography
                        variant='h5'
                        sx={{
                            ml: 2,
                            lineHeight: 1,
                            fontWeight: 700,
                            letterSpacing: '-0.45px',
                            fontSize: '1.75rem !important'
                        }}
                    >
                        Employee review page
                    </Typography>
                </Grid>
            </CardContent>

            <Divider
                sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />

            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: theme => `${theme.spacing(0)} !important` }}>
                    <Grid
                        item
                        sm={6}
                        xs={12}
                        sx={{
                            display: 'flex',
                            px: { sm: 4, xs: 0 },
                            justifyContent: ['flex-start']
                        }}
                    >
                        <div>
                            <Typography sx={{ mb: 4, fontWeight: 500 }}>Personal details:</Typography>
                            <TableContainer sx={{ width: '1100px' }}>
                                <Table>
                                    <TableBody sx={{ width: '1100px' }}>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>First name:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().firstName}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Last name:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().lastName}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Mobile number:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().phoneNumber}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>E-mail:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().email}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Date of birth:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    {`${customDateFormat(employeePersonalDetails().dateOfBirth)}`}{' '}
                                                </MUITableCell>
                                            </Grid>
                                            {/* <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().dateOfBirth}</MUITableCell> */}
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Father name:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().fatherName}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Father-phone number:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {employeePersonalDetails().fatherPhoneNumber}
                                                </MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Department:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().department}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Designation:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeePersonalDetails().designation}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>

            <Divider
                sx={{ mt: theme => `${theme.spacing(3.5)} !important`, mb: theme => `${theme.spacing(2.5)} !important` }}
            />

            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: theme => `${theme.spacing(0)} !important` }}>
                    <Grid
                        item
                        sm={6}
                        xs={12}
                        sx={{
                            display: 'flex',
                            px: { sm: 4, xs: 0 },
                            justifyContent: ['flex-start']
                        }}
                    >
                        <div>
                            <Typography sx={{ mb: 4, fontWeight: 500 }}>Education details:</Typography>
                            {/* <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>{getEmployeeEducationDetails().employeeEducationDetails}</Typography> */}
                            {getEmployeeEducationDetails().employeeEducationDetails == 'HighSchool' ? (
                                <TableContainer sx={{ width: '1100px', '@media (max-width:600px)': { width: '100%' } }}>
                                    <Table>
                                        <TableBody sx={{ width: '1100px' }}>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important', }}>
                                                        {employeeHighSchoolDetails().highSchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHighSchoolDetails().highSchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHighSchoolDetails().highSchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHighSchoolDetails().highSchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool' ? (
                                <TableContainer sx={{ width: '1100px', '@media (max-width:600px)': { width: '100%' } }}>
                                    <Table>
                                        <TableBody sx={{ width: '1100px' }}>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().highSchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important ' }}>High school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().highSchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().highSchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().highSchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />

                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().higherSecondarySchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().higherSecondarySchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().higherSecondarySchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeHigherSecondarySchoolDetails().higherSecondarySchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation' ? (
                                <TableContainer sx={{ width: '1000px', '@media (max-width:600px)': { width: '100%' } }}>
                                    <Table>
                                        <TableBody sx={{ width: '1100px' }}>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().highSchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().highSchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school address:</MUITableCell>
                                                </Grid>

                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().highSchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().highSchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().higherSecondarySchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().higherSecondarySchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().higherSecondarySchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().higherSecondarySchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().underGraduationCollegeAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college course:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().underGraduationCollegeCourse}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().underGraduationCollegeName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeeUnderGraduationDetails().underGraduationCollegePercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation' ? (
                                <TableContainer sx={{ width: '1100px', '@media (max-width:600px)': { width: '100%' } }}>
                                    <Table>
                                        <TableBody sx={{ width: '1100px' }}>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%', }}>
                                                    <MUITableCell sx={{ pb: '0 !important', display: 'flex', overflowWrap: 'break-word', flexWrap: 'wrap', backgroundColor: 'red' }} style={{ height: '100px !important', }}>
                                                        {employeePostGraduationDetails().highSchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().highSchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().highSchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>High school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().highSchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().higherSecondarySchoolName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school board:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().higherSecondarySchoolBoard}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().higherSecondarySchoolAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Higher secondary school percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().higherSecondarySchoolPercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().underGraduationCollegeAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college course:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().underGraduationCollegeCourse}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().underGraduationCollegeName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Under graduation college percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().underGraduationCollegePercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <Divider
                                                sx={{
                                                    mt: theme => `${theme.spacing(3.5)} !important`,
                                                    mb: theme => `${theme.spacing(2.5)} !important`
                                                }}
                                            />
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Post graduation college address:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().postGraduationCollegeAddress}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Post graduation college course:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().postGraduationCollegeCourse}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Post graduation college name:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().postGraduationCollegeName}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                            <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                                <Grid sx={{ maxWidth: '60% !important' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>Post graduation college percentage:</MUITableCell>
                                                </Grid>
                                                <Grid sx={{ width: '70%' }}>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {employeePostGraduationDetails().postGraduationCollegePercentage}
                                                    </MUITableCell>
                                                </Grid>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                ''
                            )}
                        </div>
                    </Grid>
                </Grid>
            </CardContent>

            <Divider sx={{ mt: '0 !important', mb: theme => `${theme.spacing(2.5)} !important` }} />
            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: theme => `${theme.spacing(0)} !important` }}>
                    <Grid
                        item
                        sm={6}
                        xs={12}
                        sx={{
                            display: 'flex',
                            px: { sm: 4, xs: 0 },
                            justifyContent: ['flex-start']
                        }}
                    >
                        <div>
                            <Typography sx={{ mb: 4, fontWeight: 500 }}>Bank details:</Typography>
                            <TableContainer sx={{ width: '1100px', '@media (max-width:600px)': { width: '100%' } }}>
                                <Table>
                                    <TableBody sx={{ width: '1100px' }}>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Bank name:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeeBankDetails().bankName}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Account number:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeeBankDetails().accountNumber}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <Grid sx={{ maxWidth: '60% !important' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}> IFSCE code:</MUITableCell>
                                            </Grid>
                                            <Grid sx={{ width: '70%' }}>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{employeeBankDetails().bankIfsceCode}</MUITableCell>
                                            </Grid>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EmployeeReviewPage
