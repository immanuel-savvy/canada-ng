import React from "react";
import Loadindicator from "../../components/loadindicator";
import { domain } from "../../assets/js/utils/constants";
import Small_btn from "../../components/small_btn";
import { post_request } from "../../assets/js/utils/services";

class Manage_upcoming_event extends React.Component {
  constructor(props) {
    super(props);

    let { timestamp } = this.props;

    this.state = { timestamp };
  }

  update = async () => {
    let { timestamp, loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });
    let result = await post_request("upcoming_event", {
      timestamp: new Date(timestamp).getTime(),
    });

    this.setState({ timestamp, loading: false });
  };

  render() {
    let { timestamp, loading } = this.state;

    return (
      <div class="login-form">
        <form>
          <div className="form-group smalls">
            <label>Date-Time*</label>
            <div className="form-group">
              <input
                type="datetime-local"
                value={
                  timestamp && new Date(timestamp).toISOString().slice(0, -8)
                }
                className="form-control"
                onChange={(e) => this.setState({ timestamp: e.target.value })}
              />
            </div>
          </div>

          {loading ? (
            <Loadindicator />
          ) : (
            <Small_btn title="Update Timestamp" action={this.update} />
          )}
        </form>
      </div>
    );
  }
}

export default Manage_upcoming_event;
