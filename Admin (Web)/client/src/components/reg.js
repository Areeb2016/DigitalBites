import React, { Component } from "react";
import "./reg.css";
import Axios from "axios";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => { //form valid function.
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class reg extends Component {
  constructor(props) { //passing properties to the constructor.
    super(props); //extending the component so have to call "super".

    this.state = { //contains all the form fields. can either be null or just simply empty strings.
      firstName: null,
      lastName: null,
      email: null,
      password: '',
      confirmPassword:'',
      address:null,
      formErrors: { //holds the errors that are likely to pop up.
        firstName: "", //can also be arrays of strings instead of single strings.
        lastName: "",
        email: "",
        password: "",
        confirmPassword:"",
        address:""
      }
    };
  }

  handleSubmit = e => { 
    const { password, confirmPassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        // make API call
    }
    e.preventDefault();

    if (formValid(this.state)) { //if the form is valid then we pass the values.
      const reg={
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        address: this.state.address
      }
      console.log(reg)
     
      Axios.post('http://localhost:5000/adminregistration',reg)
      .then(res =>{ console.log(res.data)})
      .catch(error => {
          console.log(error) 
        });
      
    } else { //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "First name has to be more than 3 characters!" : ""; //using ternary operator.
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Last name has to be more than 3 characters!" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Password has to be more than 6 characters!" : "";
        break;
        case "address":
        formErrors.address =
          value.length < 6 ? "Address has to be more than 6 characters!" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header className="mdl-layout__header"style={{background:'#8E0438'}} > 
    <div className="mdl-layout__header-row" >
      {/* Title */}
      <span className="mdl-layout-title">Welcome to Digital Bites</span>
      {/* Add spacer, to align navigation to the right */}
      <div className="mdl-layout-spacer" />
      {/* Navigation. We hide it in small screens. */}
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <a className="mdl-navigation__link" href="/">Home</a>
        <a className="mdl-navigation__link" href="/services">Services</a>
        <a className="mdl-navigation__link" href="/login">Sign In</a>
        <a className="mdl-navigation__link" href="reg">Sign Up</a>
      </nav>
    </div>
  </header>
</div>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 style={{textDecoration:'underline'}}>Admin Registration</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name*</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name*</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email*</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password*</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confirmPassword">
              <label htmlFor="confirmPassword"> Confirm Password*</label>
              <input
                className= "pp"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              </div>
              <div className="address">
              <label htmlFor="address"> Address*</label>
              <input
                className= "pp"
                placeholder="Address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              </div>
              <div className="outer">
              
            <div className="createAccount">
              <button type="submit">Create Account</button>
              </div>
              <div className="cancel">
            
            <button>Cancel</button>
           
          </div>
             
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default reg;