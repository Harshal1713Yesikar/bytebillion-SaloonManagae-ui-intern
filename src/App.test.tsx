import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HelloWorld from './App';


it("renders 'Hello World'", () => {
    render(<HelloWorld/>)
   
    const myElement = screen.getByText(/Hello World/i);
    expect(myElement).toBeInTheDocument()
});
    