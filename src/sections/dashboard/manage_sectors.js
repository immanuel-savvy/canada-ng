import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Sector from "../../components/sector";
import Add_sector from "./add_sector";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sectors = await get_request("sectors");

    if (!Array.isArray(sectors)) sectors = new Array();

    this.setState({ sectors });
  };

  toggle_add_sector = () => this.sector?.toggle();

  on_add = (sector) => {
    let { sectors, sector_in_edit } = this.state;

    if (sector_in_edit)
      sectors = sectors.map((sector_) =>
        sector_._id === sector_in_edit._id ? sector : sector_
      );
    else sectors = new Array(sector, ...sectors);

    this.setState({
      sectors,
      sector_in_edit: null,
    });
  };

  edit = (sector) => {
    this.setState({ sector_in_edit: sector }, this.toggle_add_sector);
  };

  remove = async (sector) => {
    let { sectors } = this.state;

    if (!window.confirm("Are you sure to remove sector?")) return;

    sectors = sectors.filter((sector_) => sector_._id !== sector._id);
    this.setState({ sectors });

    await post_request(`remove_sector/${sector._id}`);
  };

  render() {
    let { tours } = this.props;
    let { sectors, sector_in_edit } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="manage sectors"
          right_btn={
            <Small_btn title="Add Sector" action={this.toggle_add_sector} />
          }
        />
        <div className="row justify-content-center">
          {sectors ? (
            sectors.length ? (
              sectors.map((sector) => (
                <Sector
                  sector={sector}
                  edit={this.edit}
                  no_redirect
                  remove={this.remove}
                  key={sector._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(sector) => (this.sector = sector)}>
          <Add_sector
            sector={sector_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_sector}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_sectors;
