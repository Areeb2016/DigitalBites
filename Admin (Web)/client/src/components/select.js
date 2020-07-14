import React, {Component} from 'react';


export default class select extends Component{
    render(){
        return(
            <div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1> </h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewRestaurants">
											Select
										</a>
									</li>
									<li className="breadcrumb-item active">
									 Details
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
						
							{/* ./col */}
							<div className="col-md-6">
								<div className="card">
									{/* <div className="card-header">
										<h3 className="card-title">
											<i className="fas fa-cog" />
											Actions
										</h3>
									</div> */}
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt></dt>
											<dd>
                                            <div class="form-group">
                        <label>Select</label>
                        <select class="form-control">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
											</dd>
											<dt></dt>
                                            <dd>
                                            <div class="form-group">
                        <label>Select</label>
                        <select class="form-control">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
											</dd>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
												
													class="btn btn-block btn-primary btn-lg"
											
												>
												Submit
												</button>
											</dd>
										</dl>
									</div>
									{/* /.card-body */}
								</div>
								{/* /.card */}
							</div>
							{/* ./col */}
						</div>
					</div>
				</section>
			</div>
        )
    }
}