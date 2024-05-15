import React from "react";
import { get_request } from "../assets/js/utils/services";
import Participate from "../components/participate";

class Participation_and_partnership extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let parts = await get_request("participations");

    parts = parts.sort((p1, p2) => {
      return p1.created - p2.created;
    });

    this.setState({ parts });
  };

  render() {
    let { parts } = this.state;

    if (parts && !parts.length) return;

    return (
      <section className="">
        <div class="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Participation and{" "}
                  <span className="theme-cl">Partnership</span>
                </h2>
                <p>
                  Explore Our Categories: Dive into a World of Knowledge and
                  Discovery
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {Array.isArray(parts)
              ? parts?.map((p, i) => <Participate participation={p} key={i} />)
              : null}
          </div>
        </div>
      </section>
    );
  }
}

export default Participation_and_partnership;
