// import React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Grid, TextField, InputAdornment } from '@mui/material';
// import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import an appropriate icon for your needs
// import { Theme, useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
// const Index = () => {
//   return (
//     <Grid container justifyContent="flex-start" alignItems="center" style={{ padding: '20px' }}>
//       <Grid>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             value={null} // Set the initial value as needed
//             onChange={(date) => console.log(date)} // Handle date change as needed
//             renderInput={(startProps, endProps) => (
//               <>
//                 <TextField {...startProps} variant="standard" helperText="" placeholder="Batch Start Date" />
//                 <TextField {...endProps} variant="standard" helperText="" placeholder="Batch End Date" />
//               </>
//             )}
//             inputFormat="dd/MM/yyyy"
//             autoComplete="off"
//             required
//             startText="Batch Start Date"
//             endText="Batch End Date"

//           // Other props as needed
//           />
//         </LocalizationProvider>
//       </Grid>
//       <Grid style={{ marginLeft: "10px" }}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             value={null} // Set the initial value as needed
//             onChange={(date) => console.log(date)} // Handle date change as needed
//             renderInput={(startProps, endProps) => (
//               <>
//                 <TextField {...startProps} variant="standard" helperText="" placeholder="Batch Start Date" />
//                 <TextField {...endProps} variant="standard" helperText="" placeholder="Batch End Date" />
//               </>
//             )}
//             inputFormat="dd/MM/yyyy"
//             autoComplete="off"
//             required
//             startText="Batch Start Date"
//             endText="Batch End Date"

//           // Other props as needed
//           />
//         </LocalizationProvider>
//       </Grid>
//       const theme = useTheme();
//       const [personName, setPersonName] = React.useState<string[]>([]);

//       const handleChange = (event: SelectChangeEvent<typeof personName>) => {
//     const {
//           target: {value},
//     } = event;
//         setPersonName(
//         // On autofill we get a stringified value.
//         typeof value === 'string' ? value.split(',') : value,
//         );
//   };

//         return (
//         <div>
//           <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
//             <Select
//               multiple
//               displayEmpty
//               value={personName}
//               onChange={handleChange}
//               input={<OutlinedInput />}
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return <em>Placeholder</em>;
//                 }

//                 return selected.join(', ');
//               }}
//               MenuProps={MenuProps}
//               inputProps={{ 'aria-label': 'Without label' }}
//             >
//               <MenuItem disabled value="">
//                 <em>Placeholder</em>
//               </MenuItem>
//               {names.map((name) => (
//                 <MenuItem
//                   key={name}
//                   value={name}
//                   style={getStyles(name, personName, theme)}
//                 >
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//     </Grid>
//   );
// };

// export default Index;
