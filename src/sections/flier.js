import React from "react";
import { domain, get_request } from "../assets/js/utils/services";
import { Nav_context } from "../Contexts";
import { client_domain } from "../assets/js/utils/constants";
import Preview_image from "../components/preview_image";
import Banner_countdown from "../components/banner_countdown";

class Flier_section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    let { instructors } = this.state;
    let { best_instructors_stuffs, about } = this.props;
    if (!best_instructors_stuffs && instructors && !instructors.length) return;

    let { heading, text, bullets, image } =
      best_instructors_stuffs || new Object();

    return (
      <Nav_context.Consumer>
        {({ flier_stuff, timestamp }) => {
          let { heading, bullets, image, text } = flier_stuff || {};

          return (
            (
              <section
                class="bg-cover gray"
                // style="background:#f7f8f9 url(assets/img/call-bg.png)no-repeat;"
              >
                <div class="container">
                  <div class="row justify-content-center">
                    <div className="col-12"></div>
                    <div class="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                      <div class="call_action mt-4 mb-4 text-center">
                        {/* <h2 class="mb-4">{heading}</h2>
                        <p class="mb-4">{text}</p> */}
                        <Preview_image
                          image={image || require(`../assets/img/c_flier.jpeg`)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) || (
              <div className={about ? "gray" : ""}>
                <div className="mb-5"></div>
                <section class="imageblock pt-m-0">
                  <div class="imageblock__content left">
                    <div
                      class="background-image-holder"
                      style={{
                        backgroundImage: image
                          ? `url(${domain}/images/${image})`
                          : `url(${client_domain}/c_flier.jpeg)`,
                      }}
                    ></div>
                  </div>
                  <div class="container">
                    <div class="row align-items-center justify-content-end">
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                        <div class="lmp_caption">
                          <h2 class="mb-3">
                            {heading ||
                              "We Have The Best Instructors Available in The City"}
                          </h2>
                          <p>{text}</p>

                          {bullets
                            ? bullets.map((step, index) => (
                                <div
                                  key={index}
                                  class="mb-3 mr-4 ml-lg-0 mr-lg-4"
                                >
                                  <div class="d-flex align-items-center">
                                    <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                      <i class="fas fa-check"></i>
                                    </div>
                                    <h6 class="mb-0 ml-3">{step}</h6>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="mb-5"></div>
              </div>
            )
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Flier_section;
