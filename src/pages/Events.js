import React from "react";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Management_team from "../sections/management_team";
import Custom_nav from "../sections/nav";
import Sponsors from "../sections/sponsors";
import Testimonials from "../sections/testimonials";
import Participation_and_partnership from "../sections/participation_and_partnership";
import Flier_section from "../sections/flier";

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    scroll_to_top();
  };

  render() {
    return (
      <div>
        <Custom_nav page="about" />
        <Padder />

        <Breadcrumb_banner title="Whats coming up?" page="Events" />

        <Flier_section />

        <Participation_and_partnership />

        <Management_team />

        <Testimonials />

        <Sponsors />

        <Contact_us />

        <Footer />
      </div>
    );
  }
}

export default Events;
