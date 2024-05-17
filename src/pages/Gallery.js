import React from "react";
import Loadindicator from "../components/loadindicator";
import Media from "../components/media";
import { organisation_name } from "../assets/js/utils/constants";
import Explore_more, { scroll_to_top } from "../components/explore_more";
import Custom_nav from "../sections/nav";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Contact_us from "../components/contact_us_today";
import Listempty from "../components/listempty";
import { post_request } from "../assets/js/utils/services";
import Testimonials from "../sections/testimonials";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size, loading_more, gallery } = this.state;
    if (loading_more) return;

    gallery && this.setState({ loading_more: true });
    let { gallery: gallery_, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    if (!gallery) gallery = new Array();
    gallery = new Array(...gallery, ...gallery_);

    this.setState({
      gallery,
      total_media,
      no_more: gallery_?.length < page_size,
      loading_more: false,
      page,
    });
  };

  componentDidMount = async () => {
    scroll_to_top();
    document.title = `Gallery | ${organisation_name}`;

    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    await this.fetch_gallery();
  };

  load_more = async (e) => {
    e && e.preventDefault();

    let { page } = this.state;

    await this.fetch_gallery(page + 1);
  };

  render() {
    let { gallery, no_more, loading_more } = this.state;

    return (
      <div id="main-wrapper">
        <Custom_nav page="gallery" />
        <Padder />

        <Breadcrumb_banner title="Gallery" page="Gallery" />
        <section class="min">
          <div class="container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {gallery ? (
                gallery.length ? (
                  gallery.map((media) => (
                    <Media media={media} key={media._id} />
                  ))
                ) : (
                  <Listempty text="No media in gallery yet" />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>

          {loading_more ? (
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Loadindicator contained />
            </div>
          ) : !gallery || no_more ? null : (
            <Explore_more action={this.load_more} text="Load more" />
          )}
        </section>
        <Testimonials />
        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Gallery;
