import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const TitleContainer = styled.div`
   display: flex;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button`
 width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`

const UpdateContainer = styled.div`
// flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
  background-color: yellow;
`

const UpdateTitle = styled.span`
 font-size: 24px;
    font-weight: 600;
`

const Form = styled.div`
   display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const UpdateLeft = styled.div`

`
const UpdateRight = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const UpdateItem = styled.div`
     display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const Label = styled.label`
   margin-bottom: 5px;
    font-size: 14px;
`

const Input = styled.input`
  border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`

const Profile = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
       <Wrapper>
       <TitleContainer>
        <h1 className="userTitle">Profile</h1>
        <Link to="/newUser">
          <Button className="userAddButton">Log Out</Button>
        </Link>
      </TitleContainer>
      <UpdateContainer>
          <UpdateTitle>Edit</UpdateTitle>
          <Form >
            <UpdateLeft className="userUpdateLeft">
              <UpdateItem className="userUpdateItem">
                <Label>Username</Label>
                <Input
                  type="text"
                  // value={username}
                  name="username"
                  className="userUpdateInput"
                  // onChange={handleUsernameChange}
                />
              </UpdateItem>
              <UpdateItem className="userUpdateItem">
                <Label>Email</Label>
                <Input
                  type="text"
                  // value={email}
                  name="email"
                  className="userUpdateInput"
                  // onChange={handleEmailChange}
                />
              </UpdateItem>
              <UpdateItem className="userUpdateItem">
                <Label>Phone</Label>
                <Input
                  type="text"
                  // value={phoneNumber}
                  name="phoneNumber"
                  className="userUpdateInput"
                  // onChange={handlePhoneNumberChange}
                />
              </UpdateItem>
              <UpdateItem className="userUpdateItem">
                <Label>City</Label>
                <Input
                  type="text"
                  // value={user.address.city}
                  name="city"
                  className="userUpdateInput"
                  // onChange={handleAddressChange}
                />
              </UpdateItem>
              <UpdateItem className="userUpdateItem">
                <Label>Country</Label>
                <Input
                  type="text"
                  // value={user.address.country}
                  name="country"
                  className="userUpdateInput"
                />
              </UpdateItem>
            </UpdateLeft>
            <UpdateRight className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src=""
                  alt=""
                />
                <Label htmlFor="file">
                  {/* <Publish className="userUpdateIcon" /> */}
                </Label>
                <Input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <Button className="userUpdateButton">
                Update
              </Button>
            </UpdateRight>
          </Form>
        </UpdateContainer>
       </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
