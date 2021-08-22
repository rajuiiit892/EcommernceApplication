
import { LAPTOPS, MOBILES } from "../actions/ActionTypes";
import { Laptops } from '../../components/LaptopsInfo';

const initialState={
    laptops: Laptops,
    mobiles: []
}
const productReducer=(state=initialState, action)=>{
    switch(action.type){
        case LAPTOPS:
            return { laptops: action.data,mobiles: state.mobiles }
        case MOBILES:
            return { laptops: state.laptops,mobiles: action.data }
        default:
            return state;
    }
}
export default productReducer; 