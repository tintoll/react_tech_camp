import * as React from "react";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import { DefaultLayout } from "../containers";
import * as Pages from "../pages";

interface IProps {}
const Router : React.FC<IProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <DefaultLayout>
          <Switch>
            <Route exact path="/" component={Pages.Dashboard} />
            <Route exact path="/orders" component={Pages.Order} />
            <Route component={Pages.PageNotFound} />
          </Switch>
        </DefaultLayout>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;