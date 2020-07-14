import React, { Component } from 'react';
import "./landing.css";
import { Link } from 'react-router-dom';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import { Footer, FooterSection, FooterLinkList, FooterDropDownSection } from 'react-mdl';
import { CarouselCard, CarouselImage } from 'react-rainbow-components';
import Icon from './icon.js';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import GoogleMapReact from 'google-map-react';





const AnyReactComponent = ({ text }) => <div>{text}</div>;





const carouselContainerStyles = {
  maxWidth: 1000,
};


function Item({ title, icon, color }) {
  return (
    <div style={{ padding: 20 }}>
      <div>
        <div style={{ width: 40, height: 40, display: 'inline-flex', borderRadius: '50%', background: `${color}20` }}>
          <Icon name={icon} fontSize={14} style={{ margin: 'auto', color }} />
        </div>
        <span style={{ marginLeft: 12, fontSize: 16, fontWeight: 500, color: 'rgba(51,62,89,1)' }}>{title}</span>
      </div>
      <p style={{ margin: '20px 0', fontSize: 14, color: 'rgba(153,157,168,1)' }}>
        A caterer or event planner can use Kabaq to help potential clients choose menu items in a much more compelling manner - onsite and to scale, if desired.
      </p>
      <div style={{ color: 'rgba(102,108,124,1)' }}>

      </div>
    </div>
  )
}



class landing extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  render() {



    return (



      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header" style={{ background: '#8E0438' }} >
            <div className="mdl-layout__header-row" >
              {/* Title */}
              <span className="mdl-layout-title">Welcome to Digital Bites</span>
              {/* Add spacer, to align navigation to the right */}
              <div className="mdl-layout-spacer" />
              {/* Navigation. We hide it in small screens. */}
              <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link" href="/landing">Home</a>
                <a className="mdl-navigation__link" href="/services">Services</a>
                <a className="mdl-navigation__link" href="/login">Sign In</a>
                <a className="mdl-navigation__link" href="/faqs">FAQS</a>
              </nav>
            </div>
          </header>
        </div>
        <main class="mdl-layout__content">
          <div class="page-content">


            <section id="rainbow-p-bottom_xx-large" style={{ position: 'relative', width: '100%', height: 500 }}>
              {/* <GlobalHeader className="rainbow-m-bottom_xx-large" src="images/user/user3.jpg" /> */}
              <CarouselCard className="rainbow-m_auto" style={carouselContainerStyles}>
                <CarouselImage
                  src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  header="Add your restaurant today."

                  alternativeText="First card accessible description."
                  href="/#/Components/CarouselCard"
                />
                <CarouselImage
                  src="https://media-cdn.tripadvisor.com/media/photo-s/18/1a/d5/1e/casteloes.jpg"
                  header="Add your most popular menu items."

                  alternativeText="Second card accessible description."
                  href="/#/Components/CarouselCard"
                />
                <CarouselImage
                  src="https://www.calgarycoop.com/assets/content/thumbnails/FoodNavBlocks-seafood.jpg"
                  header="Would you like your menu to be in AR?"

                  alternativeText="Third card accessible description."
                  href="/#/Components/CarouselCard"
                />
              </CarouselCard>


            </section>



            <div className="right">
              <h2 align="center" style={{ color: '#8E0438' }}>ABOUT US</h2>
              <div className="para">
                <p align="justify" style={{ textAlign: 'center', fontSize: '130%' }}>
                  We are visual beings, and our world exists in 3D. Digital Bites enables users to see virtual 3D food on their table
                  in-restaurant and when ordering online. Customers can see the food, to scale, on their own table.
                  They can combine different side dishes
 with main courses, keeping the customer wholly in control of their selections. </p>
              </div>
              <div className="buttonn" style={{ align: "center" }}>
                <button className="button"> Read More </button>
              </div>
            </div>


            <div className="services">
              <h2 align="center" style={{ color: '#8E0438' }}>OUR SERVICES</h2>
              <div className="my-container">
                <div className="item">
                  <img className="imgg" src="https://image.freepik.com/free-photo/delicious-beef-burgers-wooden-board_23-2148290634.jpg" alt="Avatar"></img>

                </div>
                <div className="item">
                  <img className="imgg" src="https://image.freepik.com/free-photo/delicious-beef-burgers-wooden-board_23-2148290634.jpg" alt="Avatar"></img>
                </div>
                <div className="item">
                  <img className="imgg" src="https://image.freepik.com/free-photo/delicious-beef-burgers-wooden-board_23-2148290634.jpg" alt="Avatar"></img>
                </div>
                <div className="item">
                  <h1 style={{ color: '#8E0438' }}>In Restaurant Food Ordering </h1>
                  <p>Digital Bites augmented reality food menu enables restaurateurs to present their menu in 3D.</p>
                </div>
                <div className="item">
                  <h1 style={{ color: '#8E0438' }}>Augmented Reality</h1>
                  <p>We start with bringing realistic virtual objects to your life and then have the opportunity to
       use the 3D space around it as a medium for added information or digital assets. </p>
                </div>
                <div className="item">
                  <h1 style={{ color: '#8E0438' }}>Delivery</h1>
                  <p>Customers can see the food, to scale, on their own table. They can combine different side dishes with main courses,
       keeping the customer wholly in control of their selections.</p>
                </div>
              </div>
            </div>

            <div className="admin">
              <h2 align="center" style={{ color: '#8E0438' }}>WHAT YOU CAN ACHIEVE?</h2>
              <div className="box">
                <div className="my-card">
                  <div className="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="https://image.freepik.com/free-photo/doner-kebab-is-lying-cutting-board-shawarma-with-chicken-meat-onions-salad-lies-dark-old-wooden-table_120795-41.jpg" alt="Avatar" style={{ width: '300px', height: "300px" }}></img>
                      </div>
                      <div class="flip-card-back">
                        <h1>VR Technology</h1>
                        <p>Our virtual reality technology
                        allows your customers to view your beautiful
                        restaurant space in 360 view before booking 
                        for a special event.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-card">
                  <div className="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="https://image.freepik.com/free-photo/top-view-wooden-spoons-horizontal_176474-1951.jpg" alt="Avatar" style={{ width: '300px', height: "300px" }}></img>
                      </div>
                      <div class="flip-card-back">
                        <h1>AR technology</h1>
                        <p>Our augmented reality technology allows you to 
                          add your food items in 3D models for stunning 
                          visualization of your dishes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-card">
                  <div className="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="https://image.freepik.com/free-photo/high-angle-american-food-sauce_23-2148454884.jpg" alt="Avatar" style={{ width: '300px', height: "300px" }}></img>
                      </div>
                      <div class="flip-card-back">
                        <h1>Add Your Restaurants</h1>
                        <p>Admins can add multiple restaurants 
                          and view statistical reports as well as the details
                          concerning each of their restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>

            <div className="contactus">
              <h2 align="center" style={{ color: '#8E0438' }}>GET IN TOUCH</h2>
              <div className="para">
                <p align="justify" style={{ textAlign: 'center', fontSize: '130%' }}>
                  If you have any query than please don’t hesitate to contact with us we will get back to you as soon as possible.
 </p>
              </div>
              <div className="buttonn" style={{ align: "center" }}>
                <button className="button" onClick={event => window.location.href = '/contactus'}> Contact Us </button>
              </div>

            </div>











            <section id="my-footer">
              <Footer size="mega">
                <FooterSection type="middle">
                  <FooterDropDownSection >
                    <p style={{ color: 'white' }}>Features</p>
                    <FooterLinkList>
                      <a href="/">About</a>
                      <a href="/">Terms</a>
                      <a href="/">Partners</a>
                      <a href="/">Updates</a>
                    </FooterLinkList>
                  </FooterDropDownSection>

                  <FooterDropDownSection>
                    <p style={{ color: 'white' }}>Contact Us</p>
                    <FooterLinkList>
                      <a href="/">Phone Numbers: </a>
                      <a href="/">+92 305 8919036</a>
                      <a href="/">Email:</a>
                      <a href="/">info@digitalbites.com</a>
                      <a href="/">Business Hours:</a>
                      <a href="/">24/7</a>
                      <a href="/">Office Hours</a>
                      <a href="/">Monday-Sat 11 AM-10 PM (PST)</a>
                    </FooterLinkList>
                  </FooterDropDownSection>
                  <FooterDropDownSection>
                    <p style={{ color: 'white' }}>Find Us Here</p>

                  </FooterDropDownSection>
                </FooterSection>
                <FooterSection type="bottom" logo="Copyright Digital Bites 2020">
                  <FooterLinkList>

                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="3" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,186,223,1)" iconSize="3" roundness="14%" url="https://twitter.com" size="40" />
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="3" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(12,116,141,1)" iconSize="3" roundness="14%" url="https://facebook.com" size="40" />
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="3" borderStyle="solid" icon="instagram" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(238,69,68,1)" iconSize="3" roundness="14%" url="https://instagram.com" size="40" />

                  </FooterLinkList>

                </FooterSection>
                <div className='map' style={{ height: '40vh', width: '30%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDqC_afyOZbsUZ1vCGgXCZ7kABXkPFbDvE' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                  >
                    <AnyReactComponent
                      lat={33.6518}
                      lng={73.1566}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div>
              </Footer>
            </section>







          </div>
        </main>
      </div>

    )
  }
}

export default landing;
