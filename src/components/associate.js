import React from "react";
import { domain } from "../assets/js/utils/constants";

class Associate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { associate } = this.props;

    return (
      <li>
        <div className="crp_img">
          <img
            src={`${domain}/images/${associate.logo}`}
            className="img-fluid"
            alt=""
          />
        </div>
      </li>
    );
  }
}

export default Associate;
