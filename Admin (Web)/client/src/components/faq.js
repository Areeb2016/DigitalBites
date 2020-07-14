import React, { Component } from "react";
import { Card } from 'shineout';
import "./faq.css";


class faq extends React.Component {
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

          <div style={{ marginTop: 20 }}>


            <h1>Frequently Asked Questions</h1>

            <Card.Accordion defaultActive={1}>

              <Card>
                <Card.Header>How can I start using Digital Bites technology in my restaurant?</Card.Header>
                <Card.Body>Process is pretty easy, you can buy our photoshoot set and take 360 pictures of your food or just book our photographer.</Card.Body>
              </Card>
              <Card>
                <Card.Header>What if my customer doesn't have and iPhone or Android Phone?</Card.Header>
                <Card.Body>You can provide pre-loaded Ipads to your customers</Card.Body>
              </Card>
              <Card>
                <Card.Header>Can I track campaign analytics?</Card.Header>
                <Card.Body>We are working hard to make it ready as soon as possible.</Card.Body>
              </Card>
              <Card>
                <Card.Header>How can I manage my menu?</Card.Header>
                <Card.Body>You can manage your menu items through, Digital Bites admin interface.</Card.Body>
              </Card>

            </Card.Accordion>

          </div>
        </div>
      </div>
    );
  }
}

export default faq;