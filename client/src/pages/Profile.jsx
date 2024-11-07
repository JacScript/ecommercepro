import {
  // CalendarToday,
  // LocationSearching,
  // MailOutline,
  // PermIdentity,
  // PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { persistor } from "../redux/store";

// Styled components
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const UpdateContainer = styled.div`
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto;
  width: 80%;
`;

const UpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UpdateLeft = styled.div`
  width: 50%;
`;

const UpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
`;

const UpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Label = styled.label`
  margin-bottom: 1px;
  font-size: 14px;
`;

const Input = styled.input`
  border: none;
  width: 80%;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const UpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  width: 84px;
  float: right;
  text-align: center;
`;

// Profile component
const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);

  // const logoutHandler = async (e) => {
  //   // e.preventDefault();
  
  //   try {
  //     await logout(dispatch); // Wait for the logout action to complete
  //     history.push("/"); // Redirect to the home page on successful logout
  //   } catch (err) {
  //     console.error("Logout failed:", err); // Log any errors that occur
  //   }
  // };

  const logoutHandler = async (e) => {
    e.preventDefault();
  
    try {
      // Trigger the logout API call
      await logout(dispatch);
  
      // Clear the persisted state from redux-persist
      await persistor.purge(); // Clears the persisted Redux state
      await persistor.flush(); // Ensures all changes are written to storage
  
      // Clear access token or any other user-specific data from local storage
       await localStorage.removeItem("accessToken");
  
      // Redirect to the home page after successful logout
      history.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <TitleContainer>
          <h1 className="userTitle">Profile</h1>
          <Button onClick={logoutHandler}>Log Out</Button>
        </TitleContainer>
        <UpdateContainer>
          <UpdateTitle>Edit</UpdateTitle>
          <Form>
            <UpdateLeft>
              <UpdateItem>
                <Label>Username</Label>
                <Input
                  type="text"
                  value={user.username}
                  name="username"
                  readOnly
                />
              </UpdateItem>
              <UpdateItem>
                <Label>Email</Label>
                <Input
                  type="text"
                  value={user.email}
                  name="email"
                  readOnly
                />
              </UpdateItem>
              <UpdateItem>
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={user.phoneNumber}
                  name="phoneNumber"
                  readOnly
                />
              </UpdateItem>
              <UpdateItem>
                <Label>City</Label>
                <Input
                  type="text"
                  value={user.address.city || ""}
                  name="city"
                  readOnly
                />
              </UpdateItem>
              <UpdateItem>
                <Label>Country</Label>
                <Input
                  type="text"
                  value={user.address.country}
                  name="country"
                  readOnly
                />
              </UpdateItem>
            </UpdateLeft>
            <UpdateRight>
              <Upload>
                <Image src={user.img} alt="User" />
                <Label htmlFor="file">
                  <Publish />
                </Label>
                <Input type="file" id="file" style={{ display: "none" }} />
              </Upload>
              <UpdateButton disabled>Update</UpdateButton>
            </UpdateRight>
          </Form>
        </UpdateContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
