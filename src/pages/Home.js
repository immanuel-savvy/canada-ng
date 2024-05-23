import React from "react";
import { Carousel } from "react-bootstrap";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import { Nav_context } from "../Contexts";
import Articles from "../sections/articles";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Management_team from "../sections/management_team";
import Nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
import Associates from "../components/associates";
import Priority_sectors from "../sections/priority_sectors";
import Participation_and_partnership from "../sections/participation_and_partnership";
import Sponsors from "../sections/sponsors";
import Flier_section from "../sections/flier";
import Gallery from "../sections/gallery";

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

                <Flier_section />

                {/* <Who_we_are about={about} home /> */}

                {/* <Featured_sectors /> */}
                {/* <Upcoming_seminars loggeduser={loggeduser} /> */}

                <Priority_sectors />

                <Participation_and_partnership />

                <Management_team />

                <Sponsors />

                {/* <Donations /> */}

                <Testimonials />

                {/* <Live_training /> */}

                <Gallery />

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
