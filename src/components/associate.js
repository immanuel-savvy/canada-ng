import React from "react";
import { domain } from "../assets/js/utils/constants";
import Preview_image from "./preview_image";

class Associate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { associate } = this.props;

    return (
      <li>
        <Preview_image
          image={associate.logo}
          style={{ height: 50, objectFit: "cover", width: "100%" }}
        />
      </li>
    );
  }
}

export default Associate;
