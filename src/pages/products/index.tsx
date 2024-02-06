// import React, { useState } from 'react'
// import Select, { SelectChangeEvent } from '@mui/material/Select'
// import { MouseEvent } from 'react';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ProductTableFront from 'src/views/table/productTable/productTableFront';
// import AddProductPop from 'src/views/pages/Product/addProduct/addProductPop'
// import { useRouter } from 'next/router';

// import React, { useState } from 'react';
// import { forwardRef, ChangeEvent } from 'react'
// import TextField from '@mui/material/TextField';
// import { Box, Grid } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import EnhancedTable from './table';

// import List from '@mui/material/List'
// import Avatar from '@mui/material/Avatar'
// import ListItem from '@mui/material/ListItem'

// // import Checkbox from '@mui/material/Checkbox'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemAvatar from '@mui/material/ListItemAvatar'
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
// import Card from '@mui/material/Card'

// import { styled } from '@mui/material/styles'

// // import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'

// // form data
// import Menu from '@material-ui/core/Menu';

// import toast from 'react-hot-toast'
// import DatePicker from 'react-datepicker'
// import { useForm, Controller } from 'react-hook-form'
// import Radio from '@mui/material/Radio'

// import FormLabel from '@mui/material/FormLabel'
// import CardHeader from '@mui/material/CardHeader'

// import RadioGroup from '@mui/material/RadioGroup'
// import CardContent from '@mui/material/CardContent'

// import OutlinedInput from '@mui/material/OutlinedInput'
// import FormHelperText from '@mui/material/FormHelperText'
// import InputAdornment from '@mui/material/InputAdornment'


// // ** Icon Imports
// import Icon from 'src/@core/components/icon'


// // ** Types
// import { DateType } from 'src/types/forms/reactDatepickerTypes'




// const Index = () => {
//   // ** State
//   const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
//   const[open,setopan]=useState(false)
//   const[activeTable,setActiveTable]=useState<string|null>(null);
//   const[age,setAge]=useState('')
//   const handleCheckboxChange = (checkboxId: string) => {
//     setSelectedCheckbox(checkboxId === selectedCheckbox ? null : checkboxId);
//   };

//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   const handleButtonClick = () => {
//     setShowAdvancedFilters(!showAdvancedFilters);
//   };



//   const [anchorAl, setAnchorAl] = useState<null | HTMLElement>(null)

//   const handleReturn = (event: MouseEvent<HTMLButtonElement>) => {
//     setAnchorAl(event.currentTarget)
//   }

//   const handleCloseReturn = () => {
//     setAnchorAl(null)
//   }

//   const [productBl, setProductBl] = useState<null | HTMLElement>(null)

//   const handleProduct = (event: MouseEvent<HTMLButtonElement>) => {
//     setProductBl(event.currentTarget)
//   }

//   const handleCloseProduct = () => {
//     setProductBl(null)
//   }

//   const [anchorCl, setAnchorCl] = useState<null | HTMLElement>(null)

//   const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
//     setAnchorCl(event.currentTarget)
//   }

//   const handleCloseEdit = () => {
//     setAnchorCl(null)
//   }

//   const [anchorDl, setAnchorDl] = useState<null | HTMLElement>(null)
//   const [open, setOpen] = useState(false)
//   const [activeTable, setActiveTable] = useState<string | null>(null);
//   const [age, setAge] = React.useState('');

//   const handleAssign = (event: MouseEvent<HTMLButtonElement>) => {
//     setAnchorDl(event.currentTarget)
//   }

//   const handleCloseAssign = () => {
//     setAnchorDl(null)
//   }
//   const handleClose = () => {
//     setopan(false)
//   }
//   const showTable = (tableId: string) => {
//     setActiveTable(tableId);
//   };
//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//   const inventory = useRouter();
//   const handleInventory = () => {
//     inventory.push('../products/inventoryReturn');
//   }

//   const returnOrder = useRouter();
//   const handleReturnOrder = () => {
//     returnOrder.push('../products/returnOrder');
//   }


//   const productOrder = useRouter();
//   const handleProductOrder = () => {
//     productOrder.push('../products/productOrder');
//   }
//   const vendor = useRouter();
//   const handlevendor = () => {
//     vendor.push('../service/service');
//   }
//   const handleClickOpen=()=>{
//     vendor.push('../products/addNewProduct')
//   }

//   return (

//     <><Grid container spacing={2}>
//       <Grid item xs={12} sx={{ background: "blue" }}>
//         <Box
//           sx={{
//             width: '100%',
//             border: 2,
//             margin: '2px',
//             padding: "5px",
//             borderBlockColor: 'lightGray',
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={5}>
//               <TextField fullWidth label="Search" id="fullWidth" sx={{ minWidth: 300, width: '100%', background: "white" }} />
//             </Grid>
//             <Grid item xs={12} md={5}>
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Select Products</InputLabel>
//                 <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} sx={{ background: "white" }}>
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Button variant="contained" disableElevation sx={{ height: 50, backgroundColor: 'black', width: '100%' }}>
//                 Search
//               </Button>
//             </Grid>
//           </Grid>

//           <Grid container spacing={1} sx={{ padding: "10px" }}>

//             <Grid item xs={12} md={10} sx={{ display: "flex", justifyContent: "space-around" }}>

//               <FormGroup sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', color: "white" }}>
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Zero quantity product only" />
//                 <FormControlLabel required control={<Checkbox />} label="Low quantity product only" />
//                 <FormControlLabel required control={<Checkbox />} label="In stock product only" />
//               </FormGroup>
//             </Grid>
//             <Grid item xs={12} md={2} sx={{ marginTop: "10px" }}>
//               <Button variant="contained" disableElevation onClick={() => showTable('table1')} sx={{ height: 50, background: 'black', width: '100%' }}>
//                 Advanced Filters
//               </Button>
//             </Grid>

//           </Grid>

//           {/* codition of filter */}


//           <Grid container spacing={1} sx={{ padding: "10px", display: activeTable === 'table1' ? 'block' : 'none' }}>

//             <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>

//               <FormControl fullWidth sx={{ padding: "10px" }}>
//                 <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
//                 <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Brand" onChange={handleChange} sx={{ background: "white" }}>
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ padding: "10px" }}>
//                 <InputLabel id="demo-simple-select-label">Select Product Type</InputLabel>
//                 <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Product Type" onChange={handleChange} sx={{ background: "white" }}>
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ padding: "10px" }}>
//                 <InputLabel id="demo-simple-select-label">Select Vender</InputLabel>
//                 <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Vender" onChange={handleChange} sx={{ background: "white" }}>
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>

//             </Grid>


//           </Grid>
//         </Box>
//       </Grid>

//       <Grid item xs={12}>
//         <Grid>

//         <CardContent>
//         <Box>
//         <Grid container spacing={2}>
//           {/* Add product button */}
//           <Grid item xs={12} md={2}>
//             <Button variant="contained" onClick={handleClickOpen} disableElevation sx={{ height: 30, backgroundColor: 'black', width: '100%' }}>
//               Add product
//             </Button>
//           </Grid>
//         </Grid>

//         <Grid>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
//           <Button sx={{ mr: 2, width: '80px' }} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAssign} endIcon={<ArrowDropDownIcon />}>
//             Edit
//           </Button>
//           <Grid>
//             <Menu keepMounted id="simple-menu" anchorEl={anchorDl} onClose={handleCloseAssign} open={Boolean(anchorDl)}>
//               <MenuItem onClick={handlevendor}>Vendors List</MenuItem>
//               <MenuItem onClick={handleCloseAssign}>Brand View</MenuItem>
//               <MenuItem onClick={handleCloseEdit}>Product Types</MenuItem>
//               <MenuItem onClick={handleCloseEdit}>Print Barcode/label</MenuItem>
//               <MenuItem onClick={handleCloseEdit}>Sample File</MenuItem>
//               <MenuItem onClick={handleCloseEdit}>Import Products</MenuItem>
//             </Menu>
//           </Grid>
//         </Box>
//       </Grid>

//       <Dialog open={Boolean(anchorDl)} onClose={handleClose}>
//         <DialogContent>
//           {/* Your dialog content goes here */}
//         </DialogContent>
//         <DialogActions sx={{ height: '70px' }}>
//           <Button variant="contained" autoFocus onClick={handleClose} sx={{ backgroundColor: 'black' }}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </BootstrapDialog>
//     </Card>

//       {/* Other form controls */ }
//       < Grid item xs = { 12} md = { 10} sx = {{ display: "flex", justifyContent: "end" }
// }>

//   {/* Return Order */ }
//   < FormControl variant = "standard" sx = {{ minWidth: 120, margin: 3 }}>
//     <><InputLabel id="demo-simple-select-standard-label">Return Order</InputLabel><
//       labelId="demo-simple-select-standard-label"
//       id="demo-simple-select-standard"
//       value={age}
//       onChange={handleChange}
//       label="Return Order"

//     >
//       <MenuItem value="">
//         <em>Return Order</em>
//       </MenuItem>
//       <MenuItem value={10}>Inventory Return</MenuItem>
//       <MenuItem value={20}>Return Order</MenuItem>


//   <><FormControl variant="standard" sx={{ minWidth: 120, margin: 3 }}>
//     <InputLabel id="demo-simple-select-standard-label">Product Order</InputLabel>
//     <Select
//       labelId="demo-simple-select-standard-label"
//       id="demo-simple-select-standard"
//       value={age}
//       onChange={handleChange}
//       label="Product Order"
//     >
//       <MenuItem value="">
//         <em>Product Order</em>
//       </MenuItem>
//       <MenuItem value={10}>Create New</MenuItem>
//       <MenuItem value={20}>View Orders</MenuItem>

//     </Select>
//   </FormControl><FormControl variant="standard" sx={{ minWidth: 120, margin: 3 }}>
//       <InputLabel id="demo-simple-select-standard-label">Assign Product</InputLabel>
//       <Select
//         labelId="demo-simple-select-standard-label"
//         id="demo-simple-select-standard"
//         value={age}
//         onChange={handleChange}
//         label="Assign Product"
//       >
//         <MenuItem value="">
//           <em>Assign Product</em>
//         </MenuItem>
//         <MenuItem value={10}>Retail Products</MenuItem>
//         <MenuItem value={20}>IN-House Products</MenuItem>

//       </Select>
//     </FormControl></>
//           </Grid >


//         </Grid >
//       </Grid >

//   {/* Table */ }

//   < Grid item xs = { 12} >
//     <EnhancedTable />
//       </ >
//     </Grid >

//   );
// };

// export default Index;
// function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
//   throw new Error('Function not implemented.');
// }

import React from 'react'

const index = () => {
  return (
    <div>
      kdsuhdsvdy
    </div>
  )
}

export default index
