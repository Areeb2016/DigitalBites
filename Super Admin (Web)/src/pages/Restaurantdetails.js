import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";


export default class EditPage extends Component {

    constructor(props) {
        super(props);
        this.url = 'https://digitalbites.herokuapp.com/restaurant/super/';
      

   this.state = {
        id: '',
        redirect: false,
        isLoading: false,

      
        Adress:'',
        Description:'',
        image:'',
        createdby:'',
        createdat:'',
       
       
       
       
        
    };
    this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    componentDidMount() {
       
        const id = this.props.match.params.id;
        console.log(id)
        axios.get(this.url  + id)
            .then(response => {
                
                const emp = response.data;
               console.log(response)

               
                this.setState({Adress: emp.address});
                this.setState({image: emp.image});
               
                 this.setState({createdby: emp.createdBy});
                this.setState({Description: emp.description});
                this.setState({createdat: emp.createdAt});
               
               
            })
            .catch(error => {
                // this.setState({ toDashboard: true });
                console.log(error);
            });
        
    }

   

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };
    handleClickconfirm = () => { 
        const url = 'https://digitalbites.herokuapp.com/restaurant/confirm/'+ this.props.match.params.id;
       
       
        axios.patch(url, {status:"confirmed"})
        .then(result => {
           
                this.setState({redirect: true, isLoading: false})
            
        })
        .catch(error => {
            //  this.setState({ toDashboard: true });
            console.log(error);
        });
      
       
    };
    handleClickcancel= () => {
       
        const url = 'https://digitalbites.herokuapp.com/restaurant/confirm/'+ this.props.match.params.id;
        
        axios.patch(url, {status:"cancelled"})
        .then(result => {
           
                this.setState({redirect: true, isLoading: false})
            
        })
        .catch(error => {
            //  this.setState({ toDashboard: true });
            console.log(error);
        });
      
   
    };
    render() {
        const{Adress,Description,createdby,createdat,image}=this.state;
        
        console.log(createdat)
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Restaurant details</li>
                            </ol>
                        </div>






                     
                        <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Restaurant details
                                </div>
                                <div className="card-body">
  
   <div class="panel panel-info">
     <div class="panel-heading">
   
     </div>
    
     <div class="panel-body">
     <div class=" col-md-9 col-lg-9 "> 
                 {<table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Description:</th>
                        <td>{Description}</td>
                      </tr>
                      <tr>
                        <th>createdat:</th>
                        <td>{createdat}</td>
                      </tr>
                      <tr>
                        <th>Adress:</th>
                        <td>{Adress}</td>
                      </tr>

                  

                      {/* {createdby.map((employees , index)=>
                        <tr>
                        <th>createdBy:</th>
                        <td>{employees.email}</td> </tr>)
                           } */}
                     

                      <tr>
                        <th>Image:</th>
                        <img src={image} alt="boohoo" className="img-responsive"/>
                      </tr>
                     
                       
                     
                    </tbody>
                        </table> }


                        <div className="col-md-9">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">
											<i className="fas fa-cog" />
											Actions
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													id={
														this.props.match.params
															.id
													}
													class="btn btn-block btn-primary btn-lg"
													onClick={
                                                        this.handleClickconfirm
													}
												>
													Activate Restaurant
												</button>
											</dd>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													id={
														this.props.match.params
															.id
													}
													class="btn btn-block btn-danger btn-lg"
													onClick={this.handleClickcancel}
												>
													Cancel Restaurant
												</button>
											</dd>
										</dl>
									</div>
                                    </div>
                                    </div>

                        
{/*                 
                        <button  className="btn btn-primary" onClick={this.handleClickconfirm} >Confirm Restaurant</button>
                  
                   
                  <button style={{marginLeft:289}}  className="btn btn-primary" onClick={this.handleClickcancel} >Cancel Restaurant</button> */}
                 
                </div>
     

            
            
             </div> 
             </div>
                </div>
             </div>  
           
           
             
                  
{/*                                    
                                    {this.renderRedirect()} */}
                            

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
               
                </div>
            </div>
        );
    }
}


