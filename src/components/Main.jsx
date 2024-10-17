import { Component } from "react";
import OrichidsPresentation from "../Content/OrchidsPresentation";
import { Orichids } from "../Shared/listOfOrchids";

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      orichids: Orichids,
    };
  }
  render() {
    return <OrichidsPresentation orichids={this.state.orichids} />;
    //*Truy cập vào trạng thái của component và lấy dữ liệu orichids, sau đó truyền nó vào component con OrichidsPresentation.
  }
}
export default Main;
