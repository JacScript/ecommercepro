import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "22px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  align-item: center;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// 

const AvatarName = styled.div`
   font-size: 10px;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    align-item: center;
    width: 40%;
    // font-weight: 700;
`

const TopAvatar = styled.img`
  width: 40px;
  height: 40px;
  // font-size: 10px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 8px;
  // background-color: blue;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const AvatarContainer = styled.div`
  height: 30px;
  display: flex;
  width: 5rem;
  align-items: center;
  justify-content: space-between;
  // background-color: red;
`;


const Navbar = () => {
  const  user  = useSelector((state) => state.user.currentUser);
  const quantity = useSelector(state=>state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>PENGUIN TECH.</Logo>
        </Center>

        <Right>
  {user ? (
     <Link  style={{ textDecoration: "none", color: "black" }} to="/profile">
      <AvatarContainer>            
        <AvatarName>{user.username}</AvatarName>
        <TopAvatar 
          src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="User Avatar" 
          className="topAvatar" 
        />
      </AvatarContainer>
    </Link>
  ) : (
    <>
      <MenuItem>
  
        <Link  style={{ textDecoration: "none", color: "black" }} to="/register">REGISTER</Link>
      </MenuItem>
      <MenuItem>
        <Link  style={{ textDecoration: "none", color: "black" }} to="/login">SIGN IN</Link>
      </MenuItem>
    </>
  )}

<MenuItem>
    <Link to="/cart">
      <Badge badgeContent={quantity} color="primary">
        <ShoppingCartOutlined />
      </Badge>
    </Link>
  </MenuItem>

  </Right>
        {/* <Right>
          {
            user ? (
            <Link to="/profile">
            
            < AvatarContainer>            
            <AvatarName>{user.username}</AvatarName>
            <TopAvatar src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
            </AvatarContainer>
            </Link>
            
          ) 
           : (<><MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem></>)
          }
          <MenuItem>
          <Link to="/cart">
          
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Link>
          </MenuItem>
        </Right> */}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
