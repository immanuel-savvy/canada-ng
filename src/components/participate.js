import React from "react";

import Text_btn from "./text_btn";
import { post_request } from "../assets/js/utils/services";
import Small_btn from "./small_btn";

class Participate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  parse_duration = (duration) => {
    duration = Math.abs(Number(duration));

    let str;

    // if (duration > 59) {
    //   str = duration / 60;
    //   if (str * 60 < duration) {
    //     str = `${str} hrs ${duration - str} mins`;
    //   } else str = `${str} hrs`;
    // } else {
    //   str = `${duration} mins`;
    // }
    return `${duration} hrs`;
  };

  invest_now = () => this.invest?.toggle();

  show_investors = () => this.investors?.toggle();

  render() {
    let { participation, show, edit, no_btn, remove, small } = this.props;
    if (!participation) return;

    let { title, features, amount } = participation;

    return (
      <div
        className={
          no_btn || show
            ? "col-12"
            : small
            ? "col-xl-4 col-lg-4 col-md-6 col-sm-12"
            : "col-xl-6 col-lg-6 col-md-12 col-sm-12"
        }
      >
        <div className="crs_grid_list pl-3 py-3">
          <div className="crs_grid_list_caption">
            {edit || remove ? (
              <>
                <Text_btn text="Remove" action={remove} />
                &nbsp; &nbsp;
                <Text_btn text="Edit" action={edit} />
              </>
            ) : null}
            <div className="crs_lt_102">
              <h4 className="">{title} </h4>
            </div>
            <div className="crs_lt_103">
              <div className="">
                {features?.map((f, i) => {
                  return (
                    <ul key={i}>
                      <li>
                        <i className="fa fa-check mr-2"></i>
                        <span>{f}</span>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
            <div
              className="crs_flex"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div className="crs_fl_first">
                <div className="crs_price">
                  <h2>
                    <span className="currency">$&nbsp;</span>
                    <span className="theme-cl">{amount}</span>
                  </h2>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <Small_btn
                    action={() =>
                      window.open("https://forms.gle/wAKeKbGbiRg3hHpA9")
                    }
                    title="Register"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Modal ref={(invest) => (this.invest = invest)}>
          <Invest_now participation={participation} toggle={this.invest_now} />
        </Modal> */}
      </div>
    );
  }
}

export default Participate;
