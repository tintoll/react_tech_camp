import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStoreState, IShop } from "../store";
import { ShopListComponent } from "../components";
import { requestShopList } from "../actions";

interface IProps {
  shopList: IShop[];
  requestShopList(): void;
}
const mapStateToProps = (state: IStoreState) => ({
  shopList: state.shopList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestShopList: () => dispatch(requestShopList())
});

const ShopList: React.FC<IProps> = props => {
  // 첫번째는 함수,
  // 두번째는 첫번째 함수를  언제 호출할거야?라는 제어와 관련된 값
  React.useEffect(() => {
    console.log("fff");
    props.requestShopList();
  }, []);

  return <ShopListComponent data={props.shopList} />;
};

export const ShopListContailner = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopList);
