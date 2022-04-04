import * as Post from "./post";
import * as Auth from "./auth";
import * as CreateAdd from "./createAdd";
import * as UpdateStore from "./updateStore";
import * as Home from "./home";
import * as Ads from "./ads";
import * as AddShop from "./addShop";

const ActionCreators = Object.assign({}, Home, Ads,Auth, Post , CreateAdd , UpdateStore , AddShop);

export default ActionCreators;
