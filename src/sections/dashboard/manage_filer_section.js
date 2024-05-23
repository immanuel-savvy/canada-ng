import React from "react";
import {
  domain,
  get_request,
  post_request,
} from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Preview_image from "../../components/preview_image";
import Video from "../../components/video";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_flier_section extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = { bullets: new Array(), bullet_index: null };
  }

  componentDidMount = async () => {
    let flier_stuff = await get_request("flier_stuff");

    this.setState({ flier_stuff, ...flier_stuff });
  };

  add_bullet = (e) => {
    e.preventDefault();
    let { bullet_in_edit, bullet_index, bullets } = this.state;

    if (bullet_index !== null) {
      bullets[bullet_index] = bullet_in_edit;
      bullet_index = null;
    } else bullets = new Array(...bullets, bullet_in_edit);

    this.setState({ bullets, bullet_index, bullet_in_edit: "" });
  };

  edit_bullet = (index) => {
    let bullet_in_edit = this.state.bullets[index];
    this.setState({ bullet_in_edit, bullet_index: index });
  };

  filter_bullet_index = (index) => {
    let { bullets } = this.state;
    bullets.splice(index, 1);
    this.setState({ bullets });
  };

  submit = async () => {
    let { heading, image, text, bullets, uploading } = this.state;
    if (uploading) return;

    this.setState({ uploading: true });

    let res = await post_request("handle_flier_stuff", {
      heading,
      image,
      text,
      bullets,
    });

    this.setState({ image: res.image, uploading: false });
  };

  render() {
    let {
      image,
      image_loading,
      image_hash,
      bullet_index,
      bullet_in_edit,
      heading,
      text,
      uploading,
      flier_stuff,
      bullets,
      video,
    } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="manage best instructors section" />

        <div className="row">
          <div className="justify-content-center">
            {video ? (
              <Video
                url={
                  video
                    ? video.startsWith("data")
                      ? video
                      : `${domain}/Videos/${video}`
                    : null
                }
                thumbnail={image}
                thumbnail_hash={image_hash}
              />
            ) : (
              <Preview_image
                style={{ marginBottom: 20 }}
                image={image}
                image_hash={image_hash}
              />
            )}
          </div>

          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Image (1920 x 1200)</label>
                {image_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) => this.handle_file(e, "image")}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>

              <hr />

              <div className="form-group smalls">
                <label>Heading</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Heading..."
                  value={heading}
                  onChange={({ target }) =>
                    this.setState({ heading: target.value })
                  }
                />
              </div>

              <div className="form-group smalls">
                <label>Text</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Text..."
                  value={text}
                  onChange={({ target }) =>
                    this.setState({ text: target.value })
                  }
                />
              </div>

              <div className="form-group smalls">
                <label>Bullets</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type bullet"
                  value={bullet_in_edit}
                  onChange={({ target }) =>
                    this.setState({ bullet_in_edit: target.value })
                  }
                />
                {bullet_in_edit ? (
                  <a
                    onClick={this.add_bullet}
                    href="#"
                    class="btn theme-bg text-light mt-2"
                  >
                    {bullet_index === null ? "Add" : "Update"}
                  </a>
                ) : null}
              </div>
              {bullets.length ? (
                <ul class="simple-list p-0">
                  {bullets.map((bullet, i) => (
                    <li key={i}>
                      {bullet}{" "}
                      <span
                        className="px-2"
                        onClick={() => this.filter_bullet_index(i)}
                      >
                        <i className={`fa fa-trash`}></i>
                      </span>
                      <span
                        className="px-2"
                        onClick={() => this.edit_bullet(i)}
                      >
                        <i className={`fa fa-edit`}></i>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  {uploading ? (
                    <Loadindicator />
                  ) : (
                    <div className="form-group smalls">
                      <button
                        onClick={
                          ((bullets && bullets.length) || heading || text) &&
                          this.submit
                        }
                        type="button"
                        className={`btn full-width theme-bg text-white`}
                      >
                        {flier_stuff ? "Update" : "Upload"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Manage_flier_section;
