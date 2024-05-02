import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
// import Articles from "../sections/articles";
// import remarkGfm from "remark-gfm";
import { Loggeduser } from "../Contexts";
import Section_header from "../components/section_headers";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

const A_tag = ({ href, children }) => {
  return (
    <a href={href} className="theme-cl" target="_blank">
      {children}
    </a>
  );
};

const H1_tag = ({ children }) => {
  return <Section_header title={children} color_title="" description="" />;
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Loading | ${organisation_name}`;
    scroll_to_top();

    let href = window.location.href.split("/").slice(-1)[0];

    let page = await post_request("page", { item: href });
    if (!page) return window.history.go(-1);

    document.title = `${page.title} | ${organisation_name}`;
    this.setState({ page, href });
  };

  render() {
    let { page, href } = this.state;
    let { sections, image, title, image_file_hash, item } =
      page || new Object();

    if (!sections) sections = new Array();

    return (
      <Loggeduser.Consumer>
        {({ data }) => {
          if (data && !image && item?.startsWith("countr")) {
            let ctry = data.countries.find((c) => c._id === item);
            image = ctry?.image;
          }

          return (
            <div>
              <Custom_nav page="Page" />
              <Padder />

              <Breadcrumb_banner title={title} page="Page" />

              {/* {href ? (
                <Visas
                  no_more
                  query={{
                    [href.startsWith("visa") ? "visa_type" : "country"]: href,
                  }}
                />
              ) : null} */}

              {page ? (
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="container">
                        <div className="row align-items-center justify-content-between">
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="lmp_caption">
                              {sections[0]?.text?.split("\n").map((s, i) => (
                                <ReactMarkdown
                                  key={i}
                                  children={s}
                                  components={{
                                    a: A_tag,
                                    h1: H1_tag,
                                    img: Img_tag,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                            <div className="lmp_thumb">
                              <Preview_image
                                class_name="rounded"
                                style={{ width: "100%" }}
                                image_hash={image_file_hash}
                                image={image}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {sections.slice(1).map((section, i) => {
                    if (!((i + 1) % 2)) return;

                    return (
                      <section className={i % 2 ? "" : "gray"}>
                        <div className="container">
                          <div className="row justify-content-between">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              {section.text.split("\n").map((s, k) => {
                                return (
                                  <ReactMarkdown
                                    key={k}
                                    // remarkPlugins={[remarkGfm]}
                                    children={s.trim()}
                                    components={{
                                      a: A_tag,
                                      h1: H1_tag,
                                      img: Img_tag,
                                    }}
                                  />
                                );
                              })}
                            </div>
                            {sections.slice(1)[i + 1] ? (
                              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                {sections
                                  .slice(1)
                                  [i + 1].text.split("\n")
                                  .map((s, k) => {
                                    return (
                                      <ReactMarkdown
                                        key={k}
                                        // remarkPlugins={[remarkGfm]}
                                        children={s.trim()}
                                        components={{
                                          a: A_tag,
                                          h1: H1_tag,
                                          img: Img_tag,
                                        }}
                                      />
                                    );
                                  })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </section>
              ) : (
                <Loadindicator />
              )}

              {/* {item ? <Articles query={{ visa_type: item }} /> : null} */}

              <Testimonials />

              <Contact_us />

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Page;
export { H1_tag };
