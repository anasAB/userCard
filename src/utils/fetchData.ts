
//  const fetchData = () =>{
//     fetch("https://randomuser.me/api/?results=1")
//     .then(response => response.json())
//     .then((data:IUser) => {
//         console.log(data);
//         return data
//     }).catch(e =>console.log('###ERROR',e));

import { IState } from "../IState";
import { store } from "../store/store";
import { setUserState } from "../store/User/UserSlicer";


export async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=1");
    const user: IState = await response.json();
    // console.log('##Fetched Data',user.results[0]);
    
    // store.dispatch(setUserState({
    //   firstName:user.results[0].name.first,
    //   lastName: user.results[0].name.last,
    //   email: user.results[0].email,
    //   city: user.results[0].location.city, 
    //   streetName: user.results[0].location.street.name,
    //   streetNum: user.results[0].location.street.number,
    //   plz: user.results[0].location.postcode,
    //   img: user.results[0].picture.medium
    // }))
    store.dispatch( setUserState(user.results[0])  )

  }

export default fetchData

