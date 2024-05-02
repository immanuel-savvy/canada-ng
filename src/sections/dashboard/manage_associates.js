import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Associate from "../../components/associate";
import Add_associate from "./add_associate";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_associates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let associates = await get_request("associates");

    this.setState({ associates });
  };

  toggle_associate = () => this.associates?.toggle();

  on_add = (associate) => {
    let { associate_in_edit, associates } = this.state;

    if (associate_in_edit)
      associates = associates.map((s) =>
        s._id === associate._id ? associate : s
      );
    else associates = new Array(associate, ...associates);

    this.setState({ associates });
  };

  edit = (associate) => {
    this.setState({ associate_in_edit: associate }, this.toggle_associate);
  };

  remove = async (associate) => {
    if (!window.confirm("Are you sure to remove associates?")) return;
    let { associates } = this.state;

    associates = associates.filter((s) => s._id !== associate._id);
    this.setState({ associates });

    await post_request(`remove_associate/${associate._id}`);
  };

  render() {
    let { associates, associate_in_edit } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="manage associates"
          right_btn={
            <Small_btn title="Add Associate" action={this.toggle_associate} />
          }
        />
        <div className="row justify-content-center">
          <div className="part_rcp">
            <ul>
              {associates ? (
                associates.length ? (
                  associates.map((associate) => (
                    <Associate
                      remove={() => this.remove(associate)}
                      edit={() => this.edit(associate)}
                      associate={associate}
                      key={associate._id}
                    />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </ul>
          </div>
        </div>

        <Modal ref={(associates) => (this.associates = associates)}>
          <Add_associate
            associate={associate_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_associate}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_associates;
