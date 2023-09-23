import { useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';
import withRouter from './withRouter';


type IProps = {
    children: any
    onChange?: Function
    location?: Location
    navigate?: NavigateFunction
}

function RouteGard({ onChange, children }) {

    useMemo(() =>{
        onChange()

    }, [])




    return children

}

export default withRouter(RouteGard)
