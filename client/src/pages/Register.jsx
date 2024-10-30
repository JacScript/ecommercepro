import styled from "styled-components";
import { mobile } from "../responsive"; // Mobile responsiveness styling
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // Firebase storage for file uploads
import app from "../firebase.js"; // Firebase configuration
import { register } from "../redux/apiCalls.js"; // Redux action for registration

// Styled-components for layout styling
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // State variables to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    address: {
      city: "",
      country: "",
    },
  });
  const [file, setFile] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Handle input change functions
  const handleDateChange = (e) => setDateOfBirth(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  // Update address object in userDetails
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  // Handles form submission and file upload
  const handleClick = (e) => {
    e.preventDefault();
    if (!file) return;

    const fileName = new Date().getTime() + file.name; // Unique filename
    const storage = getStorage(app); // Get Firebase storage instance
    const storageRef = ref(storage, fileName); // Create a storage reference
    const uploadTask = uploadBytesResumable(storageRef, file); // Start file upload

    // File upload progress, error, and completion handling
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        // Get download URL after upload completes
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            username,
            email,
            password,
            phoneNumber,
            dateOfBirth,
            city: userDetails.address.city,
            country: userDetails.address.country,
            img: downloadURL,
          };

          // Register user and redirect to home page
          register(dispatch, user);
          console.log(user);
          history.push("/");
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="username"
            type="text"
            onChange={handleUsernameChange}
            value={username}
          />
          <Input
            placeholder="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={handlePasswordChange}
          />
          {/* Optional input for confirming password */}
          <Input
            placeholder="Phone Number"
            type="text"
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
          />
          <Input
            placeholder="Date Of Birth"
            type="date"
            onChange={handleDateChange}
            value={dateOfBirth}
          />
          <Input
            placeholder="city"
            type="text"
            name="city"
            onChange={handleAddressChange}
            value={userDetails.address.city}
          />
          <Input
            placeholder="country"
            type="text"
            name="country"
            onChange={handleAddressChange}
            value={userDetails.address.country}
          />
          <Input
            placeholder="profile"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;











































// import styled from "styled-components";
// import { mobile } from "../responsive";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../firebase.js"
// import { register } from "../redux/apiCalls.js";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.5)
//     ),
//     url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
//       center;
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 40%;
//   padding: 20px;
//   background-color: white;
//   ${mobile({ width: "75%" })}
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-wrap: wrap;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 20px 10px 0px 0px;
//   padding: 10px;
// `;

// const Agreement = styled.span`
//   font-size: 12px;
//   margin: 20px 0px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
// `;

// const Register = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [userDetails, setUserDetails] = useState({
//     address: {
//       city: "",
//       country: "",
//     },
//   });
//   const [file, setFile] = useState(null);
//   const [dateOfBirth, setDateOfBirth] = useState("");

//   const handleDateChange = (e) => setDateOfBirth(e.target.value);
//   const handleUsernameChange = (e) => setUsername(e.target.value);
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevUser) => ({
//       ...prevUser,
//       address: {
//         ...prevUser.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const fileName = new Date().getTime() + file.name;
//     const storage = getStorage(app);
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//         }
//       },
//       (error) => {
//         console.error("Upload failed:", error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           const user = {
//             username,
//             email,
//             password,
//             phoneNumber,
//             dateOfBirth,
//             city: userDetails.address.city,
//             country: userDetails.address.country,
//             img: downloadURL,
//           };
//           register(user, dispatch);
//           console.log(user);
//           history.push("/");
//         });
//       }
//     );
//   };

//   return (
//     <Container>
//       <Wrapper>
//         <Title>CREATE AN ACCOUNT</Title>
//         <Form onSubmit={handleClick}>
//           <Input placeholder="username" type="text" onChange={handleUsernameChange} value={username}/>
//           <Input placeholder="email" type="email" onChange={handleEmailChange} value={email} />
//           <Input placeholder="password" type="password" onChange={handlePasswordChange}  />
//           {/* <Input placeholder="confirm password"  /> */}
//           <Input placeholder="Phone Number" type="text" onChange={handlePhoneNumberChange} value={phoneNumber} />
//           <Input placeholder="Date Of Birth" type="date" onChange={handleDateChange} value={dateOfBirth} />
//           <Input placeholder="city" type="text" onChange={handleAddressChange} value={userDetails.address.city}/>
//           <Input placeholder="country" type="text" onChange={handleAddressChange} value={userDetails.address.country}/>
//           <Input placeholder="profile" type="file" onChange={(e) => setFile(e.target.files[0])}/>


//           <Agreement>
//             By creating an account, I consent to the processing of my personal
//             data in accordance with the <b>PRIVACY POLICY</b>
//           </Agreement>
//           <Button type="submit">CREATE</Button>
//         </Form>
//       </Wrapper>
//     </Container>
//   );
// };

// export default Register;
