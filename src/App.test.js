import { getByTestId, render, screen } from "@testing-library/react";
import axios from 'axios';
import userEvent from "@testing-library/user-event";
import Signup from "./Components/UserComponents/Signup";
import Login from "./Components/Login";
 
jest.mock('axios');
jest.mock('react-router-dom');
 
describe("Test the Signin Component", () => {
    test("render the login form with login button", async () => {
 
        render(<Signup />);
 
        const buttonList = await screen.findAllByRole("button");
        console.log();
        expect(buttonList).toHaveLength(1);
    });
   
    
     

             
 
});
