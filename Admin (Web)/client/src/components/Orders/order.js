import React,{Component} from 'react';

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

export default class Order extends Component{
  constructor(props){
    super(props);
    this.state = { //contains all the form fields. can either be null or just simply empty strings.
    
      name: null,
      email: null,
      phoneNumber: null,
      foodType:[
          {
              id:1,
              text:"Fast Food"
              
          },
          {
            id:2,
           text:"Continental"
        },
        {
            id:3,
            text:"Desi"
        }
      ],
      items: null,
      priceRange: [
        {
            id:1,
            text:"300-500"
        },
        {
            id:2,
            text:"500-1000"
        },
        {
            id:3,
            text:"1000+"
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    
    
  }

  handleChange(e) {
    if (this.state[e.target.name] !== e.target.value) {
      var data = {}
      data[e.target.name] = e.target.value;

      this.setState(data)
    }
  }

  handleSubmit = e => { 
    e.preventDefault();

    if (formValid(this.state)) {
       const order={
         name: this.state.name,
         email: this.state.email,
         phoneNumber: this.state.phoneNumber,
         items: this.state.items

       }
       console.log(order);
           
    } else { //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  render(){
    return(
    
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Add New Order</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Order Now</li>
            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>
    <section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-12">
       <div class="card card-default">
          <div className="card-header">
            <h3 className="card-title">Order Now</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
            </div>
          </div>

   <form onSubmit={this.handleSubmit} noValidate>
  {/* /.card-header */}
  <div className="card-body">
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={this.state.name} onChange={this.handleChange} class="form-control" placeholder="Enter Name"/>
        </div>
        {/* /.form-group */}
        <div className="form-group">  
          <label for="exampleInputEmail1">Email address</label>
          <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text"><i className="fas fa-envelope" /></span>
    </div>
          <input type="email" value={this.state.email} onChange={this.handleChange} class="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
        </div>
        </div>
        {/* /.form-group */}
        <div className="form-group">
          <label>Items</label>
          <input type="text" value={this.state.items} onChange={this.handleChange} class="form-control" placeholder="Enter Items"/>
        </div>
      </div>
      {/* /.col */}
      <div className="col-md-6">
     <div className="form-group">
  <label>Contact Number</label>
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text"><i className="fas fa-phone" /></span>
    </div>
    <input type="text" placeholder="Enter Contact Number"value={this.state.phoneNumber} onChange={this.handleChange} className="form-control" data-inputmask='"mask": "(999) 999-9999"' data-mask />
  </div>
  {/* /.input group */}
</div>

   <div>
  
  <div className="form-group">
    <label>Select Food Type</label>
    <select className="form-control">
      <option>Fast Food</option>
      <option>Continental</option>
      <option>Desi</option>
    </select>
  </div>
  <div className="form-group">
    <label>Select Price Range</label>
    <select className="form-control">
      <option>300-500</option>
      <option>500-1000</option>
      <option>1000+</option>
    </select>
  </div>
</div>

        {/* /.form-group */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
  </div>
  </form>
  {/* /.card-body */}
   <div className="card-footer">
   <button type="submit" class="btn btn-primary">Submit</button>
  </div> 
</div>
         </div>
         </div>
         </div>
         </section>
  </div>

  
  
  
  




    )
  }
}