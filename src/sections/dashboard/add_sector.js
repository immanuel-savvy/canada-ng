import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";

class Add_country extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { sector } = this.props;
    this.state = { name: "", ...sector };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { name, image, image_file_hash, _id } = this.state;
    this.setState({ loading: true });

    let cat = {
      name: name.trim(),
      _id,
      image,
      image_file_hash,
    };

    let result = await post_request(_id ? "update_sector" : "add_sector", cat);

    if (result?._id) {
      cat._id = result._id;
      cat.image = result.image;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create sector at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { name, loading, _id, image, image_file_loading } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Add Sector" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Sector Flag*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) =>
                        this.handle_file(e, "image", null, null, true)
                      }
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose
                    </label>
                  </div>
                  {image_file_loading ? (
                    <Loadindicator />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <span>
                        <img
                          className="py-3 rounded"
                          style={{
                            maxHeight: 200,
                            maxWidth: 200,
                            marginRight: 10,
                          }}
                          src={
                            image && image.startsWith("data")
                              ? image
                              : `${domain}/images/${image}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Sector Title</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      onChange={({ target }) =>
                        this.setState({
                          name: target.value,
                          message: "",
                        })
                      }
                      placeholder="Sector Title"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={!name.trim()}
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_country;
