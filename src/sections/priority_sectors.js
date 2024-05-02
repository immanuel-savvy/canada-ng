import React from "react";
import { Nav_context } from "../Contexts";
import Prior_sector from "./prior_sector";
import { post_request } from "../assets/js/utils/services";

class Priority_sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    // if (!Array.isArray(this.sectors)) return this.setState({ pages: [] });
    // let pages = this.sectors.map((sec) => sec.page);
    // let pages_ = await post_request(`pages`, pages);
    // pages = new Object();
    // pages_.map((p) => {
    //   pages[p._id] = p;
    // });
    // this.setState({ pages });
  };

  render() {
    let { pages } = this.state;

    let r = true;
    return (
      <Nav_context.Consumer>
        {({ sectors }) => {
          return (
            <section className="">
              <div class="container">
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                      <h2>
                        Priority <span className="theme-cl">Sectors</span>
                      </h2>
                      <p>
                        Explore Our Categories: Dive into a World of Knowledge
                        and Discovery
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  {sectors?.map((sector, i) => {
                    if (!sector.page) return;

                    r = !r;
                    return (
                      <Prior_sector
                        reverted={r}
                        gray={r}
                        sector={{ ...sector }}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Priority_sectors;
