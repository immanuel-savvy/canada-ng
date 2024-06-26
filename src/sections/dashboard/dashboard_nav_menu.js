import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { default_admin } from "../../assets/js/utils/constants";
import { to_title } from "../../assets/js/utils/functions";
import { emitter } from "../../Canada";

class Dashboard_nav_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
      navs: new Array(
        {
          title: "dashboard",
          icon: "fa-th",
        },
        {
          title: "manage_seminars",
          icon: "fa-th",
        },
        {
          title: "manage_conferences",
          icon: "fa-th",
        },
        {
          title: "pending_talks",
        },
        {
          title: "manage_team",
        },
        {
          title: "manage_sponsors",
        },
        {
          title: "manage_participate",
        },
        {
          title: "manage_speakers",
        },

        {
          title: "new_article",
        },
        {
          title: "manage_articles",
        },
        {
          title: "manage_testimonials",
        },
        {
          title: "manage_gallery",
        },
        {
          title: "video_reviews",
        },
        {
          title: "pending_testimonies",
        },
        { title: "settings" }
      ),
    };
  }

  nav_click = (title) =>
    this.setState({ current_nav: title }, () =>
      emitter.emit("dash_nav_click", title)
    );

  nav_sub_click = (subtitle) =>
    this.setState({ current_nav: subtitle }, () =>
      emitter.emit("dash_nav_click", subtitle)
    );

  render_nav = ({ title, subnav }, index) => {
    let { current_slide_index } = this.state;

    return subnav ? (
      <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header style={{}}>
          <div id="headingOne" class="card-header bg-white shadow-sm border-0">
            {" "}
            <h6 class="m-2 accordion_title">
              <a
                href="#"
                data-toggle="collapse"
                data-target={`#collapse${index}`}
                aria-expanded={current_slide_index === index ? "true" : "false"}
                aria-controls={`collapse${index}`}
                class="d-block position-relative text-dark collapsible-link py-2"
              >
                {`${to_title(title.replace(/_/g, " "))}`}
              </a>
            </h6>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            {subnav.map(({ title }, index) => (
              <li
                style={{ flexWrap: "wrap", padding: 10, cursor: "pointer" }}
                key={index}
                class={"incomplete" || "complete"}
                onClick={() => this.nav_dash(title)}
              >
                {to_title(title.replace(/_/g, " "))}
              </li>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    ) : (
      <h6
        class="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => this.nav_dash(title)}
      >
        <a class="d-block position-relative text-dark py-2">{`${to_title(
          title.replace(/_/g, " ")
        )}`}</a>
      </h6>
    );
  };

  nav_dash = (title) => emitter.emit("dash_nav_click", title);

  render = () => {
    let { admin } = this.props;
    let { navs } = this.state;

    return (
      <Accordion defaultActiveKey="0">
        {navs.map((nav, i) =>
          admin && admin._id !== default_admin && nav.title === "admins"
            ? null
            : this.render_nav(nav, i)
        )}
      </Accordion>
    );
  };
}

export default Dashboard_nav_menu;
