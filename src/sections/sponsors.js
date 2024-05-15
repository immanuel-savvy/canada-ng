import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Section_header from "../components/section_headers";
import Sponsor from "../components/sponsor";
import { Nav_context } from "../Contexts";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { event } = this.props;

    let sponsors;
    if (!event) {
    } else {
      sponsors = await get_request(`event_sponsors/${event._id}`);
    }

    if (!Array.isArray(sponsors)) sponsors = new Array();

    this.setState({ sponsors });
  };

  render() {
    return (
      <Nav_context.Consumer>
        {({ sponsors }) => {
          if (!sponsors?.length) return;

          return (
            <section className="ed_view_box">
              <div className="container">
                <Section_header
                  title="sponsors"
                  description="We are incredibly grateful for the support and contribution of our valued sponsors."
                />

                <div className="row align-items-center justify-content-center">
                  {sponsors ? (
                    sponsors.map((sponsor) => (
                      <Sponsor sponsor={sponsor} key={sponsor._id} />
                    ))
                  ) : (
                    <Loadindicator />
                  )}
                </div>
              </div>
            </section>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Sponsors;
