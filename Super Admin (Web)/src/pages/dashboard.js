import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {

    state = {
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.state={
            employees: []
        }
        this.url = 'https://digitalbites.herokuapp.com/restaurant/';
       
    }
    

 componentDidMount() {

       
        axios.get(this.url )
            
            .then(response => {
                console.log(response)
                this.setState({employees: response.data});
            })
            .catch(error => {
                // this.setState({ toDashboard: true });
                console.log(error);
            });
    }


    render() {
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
                                <li className="breadcrumb-item active">Overview</li>
                            </ol>

                            <div className="row">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-comments"></i>
                                            </div>
                                            <div className="mr-5">26 New Messages!</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to={'#'}>
                                            <span className="float-left">View Details</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-list"></i>
                                            </div>
                                            <div className="mr-5">11 New Tasks!</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-shopping-cart"></i>
                                            </div>
                                            <div className="mr-5">123 New Orders!</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-life-ring"></i>
                                            </div>
                                            <div className="mr-5">13 New Tickets!</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Employees List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th>Phone No</th>
                                            <th>Email ID</th>
                                            <th>Delivery</th>
                                         
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.employees.map((employees , index)=>
                                                <tr key={employees._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{employees.name}</td>
                                                    <td>{employees.contactNumber}</td>
                                                   
                                                    <td>{employees.email}</td>
                                                    <td>{employees.estimatedDeliveryTime}</td>
                                                  
                                                    <td>{employees.status}</td>
                                                    <td className="text-center">
                                                    <Link className="btn btn-sm btn-info" to={{ pathname: 'rdetails/'+ employees._id }}>View Details</Link>
                                                   
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                </div>

                        </div>

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
