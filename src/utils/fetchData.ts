import { IState } from "../IState";
import { store } from "../store/store";
import { setUserState } from "../store/User/UserSlicer";

export async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=1");
    const user: IState = await response.json();
    store.dispatch( setUserState(user.results[0])  )
  }

export default fetchData

