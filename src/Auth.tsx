import React, { useEffect } from 'react';
import { getIsSignedIn, getUid } from './redux/users/selectors';
import { useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { InitialState } from 'redux/store/initialState';
import { StaticContext } from 'react-router';

const Auth = (props:any) => {
    const selector = useSelector((state: InitialState) => state);
    const isSignedIn = getIsSignedIn(selector);
    const uid = getUid(selector);
    const history = useHistory();

    useEffect(() => {
        if(!isSignedIn && uid === '') {
            console.log('ほむに戻します')
            history.push('/')
        }
    }, [isSignedIn, uid])

    if(!isSignedIn) {
        return <></>
    } else {
        return props.children
    }

}


export default Auth;