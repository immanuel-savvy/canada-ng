import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Logged_admin, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forgot_password from "./pages/Forgot_password";
import Signup from "./pages/Signup";
import Page_not_found from "./pages/404";
import Adminstrator from "./pages/Adminstrator";
import { client_domain, organisation_name } from "./assets/js/utils/constants";
import { get_request, post_request } from "./assets/js/utils/services";
import { get_session, save_to_session } from "./sections/footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Verify_email from "./pages/Verify_email";
import New_seminar from "./pages/New_seminar";
import My_seminars from "./pages/My_seminars";
import Seminar_detail from "./pages/Seminar_detail";
import Certificate from "./pages/Certificate";
import Speakers from "./pages/Speakers";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Article from "./pages/Article";
import Sponsors from "./pages/Sponsors";
import Conferences from "./pages/Conferences";
import New_conference from "./pages/New_conference";
import My_conferences from "./pages/My_conferences";
import Conference from "./pages/Conference";
import Mentorship from "./pages/Mentorship";
import Internship from "./pages/Internship";
import Seminars from "./pages/Seminars";
import Page from "./pages/Page";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";

const emitter = new Emitter();

class Canada extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object(),
      subnavs: new Object(),
      navs: new Array(
        {
          title: "search",
          path: "/search_result",
        },
        {
          title: "home",
          path: "/",
        },
        // {
        //   title: "seminars",
        //   path: "/seminars",
        //   submenu: new Array(
        //     {
        //       title: "upcoming_seminars",
        //       path: "/upcoming_seminars",
        //     },
        //     {
        //       title: "my_seminars",
        //     },
        //     {
        //       title: "past_seminars",
        //       path: "/past_seminars",
        //     }
        //   ),
        // },
        // {
        //   title: "conferences",
        //   path: "/conferences",
        //   submenu: new Array(
        //     {
        //       title: "upcoming_conferences",
        //       path: "/upcoming_conferences",
        //     },
        //     {
        //       title: "my_conferences",
        //     },
        //     {
        //       title: "past_conferences",
        //       path: "/past_conferences",
        //     }
        //   ),
        // },
        // {
        //   title: "speakers",
        //   path: "/speakers",
        // },
        {
          title: "about",
          path: "/about",
        },
        {
          title: "events",
          path: "/events",
        },
        {
          title: "gallery",
          path: "/gallery",
        },
        {
          title: "sponsors",
          path: "/sponsors",
        },
        {
          title: "news",
          path: "/newsroom",
        },
        // {
        //   title: "testimonials",
        //   path: "/testimonials",
        // },
        {
          title: "register",
          path: "https://forms.gle/wAKeKbGbiRg3hHpA9",
        }
      ),
    };
  }

  componentDidMount = async () => {
    let loggeduser = get_session("loggeduser");
    loggeduser && this.setState({ loggeduser });

    document.title = organisation_name;

    emitter.single_listener("is_logged_in", this.is_logged_in);

    this.edit_seminar = (Canada) =>
      this.setState({ seminar_in_edit: Canada }, () => {
        save_to_session("seminar_in_edit", Canada);

        window.location.assign(`${client_domain}/edit_seminar`);
      });

    emitter.listen("edit_seminar", this.edit_seminar);

    let entry = await get_request("entry");

    this.setState({ entry });
  };

  componentWillUnmount = () => {};

  set_subnav = async (nav) => {
    let { subnavs } = this.state;
    if (subnavs[nav._id]) return;

    let navs = await post_request("get_courses", { courses: nav.submenu });
    subnavs[nav._id] = navs.map((nav) => ({
      ...nav,
      path: "/course",
      on_click: () => this.handle_course(nav),
    }));
    this.setState({ subnavs });
  };

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  logout = () =>
    this.setState({ loggeduser: null }, () => {
      window.sessionStorage.removeItem("loggeduser");
      window.location.assign(client_domain);

      delete this.log_timestamp;
    });

  restore_loggeduser = (loggeduser, cb) =>
    this.setState({ loggeduser }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
      cb && cb();
    });

  login = (user, no_redirect) =>
    this.setState({ loggeduser: user }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user));

      if (!this.log_timestamp) this.log_timestamp = Date.now();

      if (no_redirect) return;

      let red = window.sessionStorage.getItem("redirect");

      window.sessionStorage.removeItem("redirect");
      window.location.assign(red || client_domain);
    });

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  render = () => {
    let {
      loggeduser,
      entry,
      navs,
      subnavs,
      submenus,
      admin_logged,
      seminar_in_edit,
    } = this.state;

    return (
      <Loggeduser.Provider
        value={{
          loggeduser,
          logout: this.logout,
          set_loggeduser: this.restore_loggeduser,
          login: this.login,
          is_logged_in: this.is_logged_in,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              ...entry,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
              logo: entry?.logo,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route index element={<Home entry={entry} />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="speakers" element={<Speakers />} />
                <Route
                  path="my_seminars"
                  element={<My_seminars loggeduser={loggeduser} />}
                />
                <Route
                  path="certificate/:Canada/:user"
                  element={<Certificate />}
                />
                <Route path="Canada" element={<Seminar_detail />} />
                <Route path="newsroom" element={<Blog />} />
                <Route path="article" element={<Article />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="events" element={<Events />} />
                <Route path="conference" element={<Conference />} />
                <Route path="new_conference" element={<New_conference />} />
                <Route path="sponsors" element={<Sponsors />} />
                <Route path="seminars" element={<Seminars />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="internship" element={<Internship />} />
                <Route path="p/:title/:_id" element={<Page />} />
                <Route path="new_seminar" element={<New_seminar />} />
                <Route path="conferences" element={<Conferences />} />
                <Route path="my_conferences" element={<My_conferences />} />
                <Route
                  path="edit_seminar"
                  element={<New_seminar Canada={seminar_in_edit} />}
                />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify_email" element={<Verify_email />} />
                <Route path="forgot_password" element={<Forgot_password />} />
                <Route path="adminstrator" element={<Adminstrator />} />
                <Route path="*" element={<Page_not_found />} />
              </Routes>
            </BrowserRouter>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default Canada;
export { emitter };
