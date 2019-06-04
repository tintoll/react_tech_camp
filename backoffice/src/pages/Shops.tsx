import * as React from "react";
import { ShopListContailner, AuthContainer } from "../containers";
import { PageHeader } from "../components";

export default class Shops extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <AuthContainer>
          <PageHeader label="가게" />
        </AuthContainer>
        <ShopListContailner />
      </React.Fragment>
    );
  }
}
