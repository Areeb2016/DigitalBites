import React, { Component } from 'react';

export default class Footer extends Component {


  render() {
    return (
      <div>
        <footer className="main-footer" style={{
          backgroundColor: "#F8F8F8",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",


          left: "0",
          bottom: "0",
          height: "60px",
          width: "100%",
        }}>
          <strong>Copyright © 2020 <a href="http://adminlte.io">Digital Bites</a>.</strong>




        </footer>
      </div>


    )
  }
}