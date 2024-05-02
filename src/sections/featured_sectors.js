import React from "react";
import { Nav_context } from "../Contexts";
import Loadindicator from "../components/loadindicator";
import Sector from "../components/sector";

class Featured_sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Nav_context.Consumer>
        {({ sectors }) => {
          if (!sectors?.length) return;
          console.log(sectors);

          return (
            <section className="gray">
              <div class="container">
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                      <h2>
                        <span className="theme-cl">Sectors</span>
                      </h2>
                      <p>
                        Explore Our Categories: Dive into a World of Knowledge
                        and Discovery
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center">
                  {sectors ? (
                    sectors.map((sec) =>
                      sec?.name ? <Sector sector={sec} key={sec._id} /> : null
                    )
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

export default Featured_sectors;
