import React from "react";
import { client_domain } from "../../assets/js/utils/constants";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Seminar from "../../components/seminar";
import Small_btn from "../../components/small_btn";
import { emitter } from "../../Canada";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let seminars = await post_request("seminars");

    this.setState({ seminars });
  };

  edit = (seminar) => {
    emitter.emit("edit_seminar", seminar);
  };

  remove = async (seminar_id) => {
    if (!window.confirm("Are you sure to remove seminar?")) return;

    let { seminars } = this.state;

    seminars = seminars.filter((s) => s._id !== seminar_id);

    this.setState({ seminars });

    await post_request(`remove_seminar/${seminar_id}`);
  };

  render() {
    let { seminars } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="seminars"
          right_btn={
            <Small_btn
              title="New Seminar"
              action={() =>
                window.location.assign(`${client_domain}/new_seminar`)
              }
            />
          }
        />
        <div className="row">
          {seminars ? (
            seminars.length ? (
              seminars.map((seminar) => (
                <Seminar
                  seminar={seminar}
                  in_seminars
                  remove={() => this.remove(seminar._id)}
                  edit={() => this.edit(seminar)}
                  key={seminar._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_seminars;
