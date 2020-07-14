import React, { Component } from 'react';
import "./services.css";









class services extends Component {
    render() {
        return (

            <div>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <header
                        className="mdl-layout__header"
                        style={{ background: "#8E0438" }}
                    >
                        <div className="mdl-layout__header-row">
                            {/* Title */}
                            <span className="mdl-layout-title">
                                Welcome to Digital Bites
							</span>
                            {/* Add spacer, to align navigation to the right */}
                            <div className="mdl-layout-spacer" />
                            {/* Navigation. We hide it in small screens. */}
                            <nav className="mdl-navigation mdl-layout--large-screen-only">
                                <a
                                    className="mdl-navigation__link"
                                    href="/"
                                >
                                    Home
								</a>
                                <a
                                    className="mdl-navigation__link"
                                    href="/services"
                                >
                                    Services
								</a>
                                <a
                                    className="mdl-navigation__link"
                                    href="/login"
                                >
                                    Sign In
								</a>
                                <a className="mdl-navigation__link" href="/faqs">
                                    Faqs
								</a>
                            </nav>
                        </div>
                    </header>
                </div>
                <div className="main">
                    <section class="my-hero">

                        <div class="my-hero-content">

                            <h1 class="my-hero-title">
                                Our Services
       </h1>

                            <h2 class="my-hero-subtitle">
                                Discover the food industry in a new light.
       </h2>

                            {/* <button type="button" class="hero-button" onclick="/contactus">
            Contact Us&raquo;
       </button> */}

                        </div>

                    </section>

                   
<section>
    <div className="separator">
    <h2  className="my-head" style={{color:'#8E0438'}}><span>AR Technology</span></h2>
    <div className="my-image">
        <img className="my-image1" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
        <div><p className="my-p1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue 
        nihil imperdiet doming id quod mazim placerat facer possim assum.</p></div>

    </div>

    <h2  className="my-head" style={{color:'#8E0438'}}><span>Virtual Reality</span></h2>
    <div className="my-div2">
        <div>
            <p className="my-p2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue 
            
            </p>
            
            <img className="my-image2" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            
        </div>
    </div>

    <h2  className="my-head" style={{color:'#8E0438'}}><span>Rider Tracking</span></h2>
    <div className="my-div3">
    <img className="my-image3" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
    <div><p className="my-p3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue 
        nihil imperdiet doming id quod mazim placerat facer possim assum.</p></div>
    </div>
    <h2  className="my-head" style={{color:'#8E0438'}}><span>Orders and Reservations</span></h2>
    <div className="my-div4">
    <div>
            <p className="my-p4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue 
            
            </p>
            </div>
            <img className="my-image4" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>

    </div>





    </div>

</section>
                </div>
            </div>

        );
    }
}


export default services;



