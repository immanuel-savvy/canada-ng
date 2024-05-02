import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";

class Add_associate extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { associate } = this.props;
    this.state = { logo: "", name: "", url: "", ...associate };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { name, logo_file_hash, logo, logo_hash, _id } = this.state;

    let associate = {
      name,
      logo_hash: logo_file_hash || logo_hash,
      logo,
      _id,
    };

    let res = await post_request(
      _id ? "update_associate" : "add_associate",
      associate
    );

    if (res?._id) {
      associate._id = res._id;
      associate.logo = res.logo;
      associate.created = res.created;

      on_add && (await on_add(associate));
      toggle();
    } else {
      this.setState({
        message: res?.message || "Cannot add associate at the moment",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { _id, logo, name, logo_file_loading, loading } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Sponsor" toggle={toggle} />
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Picture*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) =>
                        this.handle_file(e, "logo", null, null, true)
                      }
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose Logo
                    </label>
                  </div>
                  {logo_file_loading ? (
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
                            logo && logo.startsWith("data")
                              ? logo
                              : `${domain}/images/${logo}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Name</label>
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
                      placeholder="Name"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={!name?.trim() || !logo?.trim()}
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

export default Add_associate;
