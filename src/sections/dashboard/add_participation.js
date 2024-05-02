import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import { Loggeduser } from "../../Contexts";
import Small_btn from "../../components/small_btn";
import Text_btn from "../../components/text_btn";

class Add_participate extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { participate } = this.props;
    this.state = {
      title: "",
      features: new Array(),
      ...participate,
    };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { title, _id, amount, features } = this.state;
    this.setState({ loading: true });

    let cat = {
      title: title.trim(),
      _id,
      features,
      amount,
    };

    let result = await post_request(
      _id ? "update_participate" : "add_participate",
      cat
    );

    if (result?._id) {
      cat._id = result._id;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create participate at the moment.",
        loading: false,
      });
    }
  };

  add_feature = () => {
    let { feature, features, feature_in_edit } = this.state;

    if (typeof feature_in_edit === "number")
      features[feature_in_edit] = feature;
    else features = new Array(feature, ...features);

    this.setState({ features, feature_in_edit: null, feature: "" });
  };

  render() {
    let { toggle } = this.props;
    let { title, features, loading, amount, _id, feature } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, entry }) => {
          this.loggeduser = loggeduser;

          return (
            <div>
              <div className="modal-content overli" id="loginmodal">
                <Modal_form_title title="Add Investment" toggle={toggle} />

                <div className="modal-body">
                  <div className="login-form">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <div className="input-with-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={({ target }) =>
                              this.setState({
                                title: target.value,
                                message: "",
                              })
                            }
                            placeholder="Investment Title"
                          />
                          <i className="ti-text"></i>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Features</label>
                          <input
                            className="form-control"
                            placeholder="Add Feature..."
                            value={feature}
                            onChange={({ target }) =>
                              this.setState({ feature: target.value })
                            }
                          />
                        </div>

                        <Small_btn
                          title={
                            typeof feature_in_edit === "number" ? "Edit" : "Add"
                          }
                          action={this.add_feature}
                        />

                        <br />
                        <br />
                      </div>

                      {features && features.length
                        ? features.map((feature, index) => (
                            <div class="mb-3 mr-4 ml-lg-0 mr-lg-4" key={index}>
                              <div class="d-flex align-items-center">
                                <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                  <i class="fas fa-check"></i>
                                </div>
                                <h6 class="mb-0 ml-3">{feature}</h6>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <Text_btn
                                  icon="fa-edit"
                                  action={() =>
                                    this.setState({
                                      feature_in_edit: index,
                                      feature,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          ))
                        : null}

                      <div className="col-12 form-group">
                        <label>Amount</label>
                        <input
                          type={"number"}
                          className="form-control"
                          value={amount}
                          onChange={({ target }) =>
                            this.setState({
                              amount: target.value,
                              message: "",
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <Stretch_button
                          disabled={!title?.trim() || !amount?.trim()}
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
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Add_participate;
