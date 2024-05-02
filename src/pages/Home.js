import React from "react";
import { Carousel } from "react-bootstrap";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Upcoming_seminars from "../components/upcoming_seminars";
import { Loggeduser, Nav_context } from "../Contexts";
import Articles from "../sections/articles";
import Donations from "../sections/donations";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Live_training from "../sections/live_training";
import Management_team from "../sections/management_team";
import Nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
import Vision_mission_stuff from "../sections/vision_mission_stuff";
import Who_we_are from "../sections/who_we_are";
import Featured_sectors from "../sections/featured_sectors";
import Associates from "../components/associates";
import Priority_sectors from "../sections/priority_sectors";
import Participation_and_partnership from "../sections/participation_and_partnership";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  componentDidMount = () => {
    let heros = new Array({
      main_text: "",
      sub_text: "",
      bg: require("../assets/img/hero1.jpg"),
    });

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;
    let { entry } = this.props;

    return (
      <Nav_context.Consumer>
        {({ about }) => {
          return (
            <div>
              <Nav page="" />
              <div className="body">
                {entry || heros ? (
                  <div
                    style={{
                      backgroundImage: `url(${require("../assets/img/hero1.png")})`,
                    }}
                  >
                    <Carousel fade nextLabel="" prevLabel="" indicators={false}>
                      {(entry?.banners || heros).map((hero, index) => (
                        <Carousel.Item>
                          <Hero_banner hero={hero} key={index} />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <Loadindicator />
                )}
                <Associates />

                <Who_we_are about={about} home />

                <Featured_sectors />
                {/* <Upcoming_seminars loggeduser={loggeduser} /> */}

                <Priority_sectors />

                <Participation_and_partnership />

                {/* <Management_team /> */}

                {/* <Donations /> */}

                <Testimonials />

                {/* <Live_training /> */}

                <Articles />

                <Contact_us />
              </div>
              <Footer />
            </div>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Home;
