import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Manage_page from "../sections/dashboard/add_page";
import { client_domain } from "../assets/js/utils/constants";

class Sector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_page = () => this.page?.toggle();

  toggle_cities = () => this.cities?.toggle();

  render() {
    let { sector, full, tours, edit, remove, cc, no_redirect } = this.props;
    if (!sector) return;

    let { name, image, image_file_hash, _id, page } = sector;

    return (
      <div
        onClick={
          full || cc || (page && !no_redirect)
            ? () => window.location.assign(`${client_domain}/p/${name}/${_id}`)
            : null
        }
        style={full || cc || page ? { cursor: "pointer" } : null}
        className={full ? "col-11" : "col-xl-3 col-lg-4 col-md-6 col-sm-6"}
      >
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb">
            <Preview_image
              image_hash={image_file_hash}
              style={{ height: 100, resizeMode: "cover" }}
              image={
                image || require("../assets/img/user_image_placeholder.png")
              }
              class_name="img-fluid w-100"
            />
          </div>
          <div className="crs_trt_caption">
            <div className="instructor_title">
              <h4>{to_title(name)}</h4>
            </div>
          </div>

          {edit || remove ? (
            <div className="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {edit && <Text_btn text="Edit" action={() => edit(sector)} />}
                {!tours && (
                  <Text_btn
                    text="Page"
                    icon={sector.page ? "fa-edit" : "fa-plus"}
                    action={this.toggle_page}
                  />
                )}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(sector)} />
                )}
              </div>
            </div>
          ) : null}
        </div>

        <Modal ref={(page) => (this.page = page)}>
          <Manage_page item={sector} toggle={this.toggle_page} />
        </Modal>
      </div>
    );
  }
}

export default Sector;
