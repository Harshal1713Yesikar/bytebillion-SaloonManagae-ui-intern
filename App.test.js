import {render,screen} from '@testing-library/react'
import test from 'node:test'
// import StaffList from './views/ManageStaffView/StaffList'
import CreateStaff from './src/views/ManageStaffView/AddStaff'


test('render learn react link',()=>{
    // render(<StaffList/>)
    render(<CreateStaff/>)
   
    const linkElement = screen.getByText(/Add Employee/i );
    expect (linkElement).toBeInTheDocument();
    
    // expect(screen.getByText('')).toBeInTheDocument();
})