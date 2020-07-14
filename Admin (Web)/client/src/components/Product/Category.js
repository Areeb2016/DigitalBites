import React, { Component } from "react";
import "./contactus.css";
import { Message } from 'shineout'
import Axios from "axios";



const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneNumberRegex = RegExp(
  /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
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

class contactus extends Component {
  constructor(props) { //passing properties to the constructor.
    super(props); //extending the component so have to call "super".



    this.state = { //contains all the form fields. can either be null or just simply empty strings.
      name: null,
      notes: null,
      formErrors: { //holds the errors that are likely to pop up.
        name: "",
        notes: ""
      }
    };

    this.token = localStorage.getItem('token');

  }

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = 'https://digitalbites.herokuapp.com/food/category';
    var headers = {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + token
    }

    if (formValid(this.state)) {
      const Rider = {
        name: this.state.name,


        description: this.state.notes,


      }

      Axios.post(url, Rider, { "headers": headers })
        .then(res => {

          Message.success("Category successfully created", 6, {
            position: 'top-right',
            title: 'Successful',
          })
          window.location.href = "/addproduct"
        })
        .catch(error => {
          Message.error(error)
        });

    } else { //if the form is invalid then we display the corresponding error message.
      Message.error("FORM INVALID", 6, {
        position: 'top-right',
        title: 'Unsuccessful',
      })
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {

      case "name":
        formErrors.name =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;


      case "notes":
        formErrors.notes =
          value.length < 6 ? "Minimum 6 characters required." : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;


    return (
      <div id="wrapper">

        <div id="content-wrapper">
        <section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
							
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
											Add Category
									
									</li>
								
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
        <section className="content">
          <div className="wrapper">
            <div className="form-wrapper" style={{
										width: "600px",
										marginTop: "-30px",
										borderStyle: "solid",
									}}>
              <h1>Add Category</h1>
              <form onSubmit={this.handleSubmit} noValidate>


                <div className="name">
                  <label htmlFor="name">Name*</label>
                  <input
                    className={formErrors.name.length > 0 ? "error" : null}
                    placeholder="Name"
                    type="text"
                    name="name"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.name.length > 0 && (
                    <span className="errorMessage">{formErrors.name}</span>
                  )}
                </div>



                <div className="notes">
                  <label htmlFor="notes">Description*</label>
                  <input
                    className={formErrors.notes.length > 0 ? "error" : null}
                    placeholder="Description"
                    type="text"
                    name="notes"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.notes.length > 0 && (
                    <span className="errorMessage">{formErrors.notes}</span>
                  )}
                </div>
                <div className="outer">
              
            <div className="createAccount">
              <button type="submit">Submit</button>
              </div>
              <div className="cancel">
            
            <button>Cancel</button>
           
          </div>
             
            </div>
              </form>
            </div>
          </div>
          </section>
        </div>
      </div>
    );
  }
}

export default contactus;