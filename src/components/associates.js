import React from "react";
import Associate from "./associate";
import { Nav_context } from "../Contexts";

class Associates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      associates: new Array(
        { image: "aws_giit_africa.png" },
        { image: "cisco_with_giit_africa.png" },
        { image: "google_with_giit_africa.png" },
        { image: "microsoft_with_giit_africa.png" }
      ),
    };
  }

  render() {
    return (
      <Nav_context.Consumer>
        {({ associates }) => {
          if (!associates?.length) return;

          return (
            <section className="p-0" style={{ zIndex: 2 }}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="crp_box ovr_top">
                      <div className="row align-items-center m-0">
                        {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                          <div className="crp_tags">
                            <h6>{`Vast array of courses in one place`}</h6>
                          </div>
                        </div> */}
                        <div
                          className={
                            "col-12" || "col-xl-10 col-lg-9 col-md-8 col-sm-12"
                          }
                        >
                          <div className="part_rcp">
                            <ul>
                              {associates.map((associate, index) => (
                                <li key={index}>
                                  <Associate associate={associate} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Associates;
