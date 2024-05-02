import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Add_participation from "./add_participation";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Padder from "../../components/padder";
import Participate from "../../components/participate";

class Manage_participation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let participations = await get_request("participations");

    if (!Array.isArray(participations)) participations = new Array();

    this.setState({ participations });
  };

  toggle_participate = () => this.participation?.toggle();

  on_add = (participation) => {
    let { participations, in_edit } = this.state;

    if (in_edit)
      participations = participations.map((participate_) =>
        participate_._id === in_edit._id ? participation : participate_
      );
    else participations = new Array(participation, ...participations);

    this.setState({
      participations,
      in_edit: null,
    });
  };

  edit = (participation) => {
    this.setState({ in_edit: participation }, this.toggle_participate);
  };

  remove = async (participation) => {
    let { participations } = this.state;

    if (!window.confirm("Are you sure to remove participation?")) return;

    participations = participations.filter(
      (participate_) => participate_._id !== participation._id
    );
    this.setState({ participations });

    await post_request(`remove_participate/${participation._id}`);
  };

  render() {
    let { participations, in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Padder />
        <Dashboard_breadcrumb
          crumb="manage participations"
          right_btn={<Small_btn title="Add" action={this.toggle_participate} />}
        />
        <div className="row justify-content-center">
          {participations ? (
            participations.length ? (
              participations.map((participation) => (
                <Participate
                  participation={participation}
                  edit={() => this.edit(participation)}
                  remove={() => this.remove(participation)}
                  key={participation._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(participation) => (this.participation = participation)}>
          <Add_participation
            participation={in_edit}
            on_add={this.on_add}
            toggle={this.toggle_participate}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_participation;
