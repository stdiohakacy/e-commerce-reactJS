import React, { Component } from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ShopPage } from './pages/shop/shop.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import Header from './components/header/header.component'
class App extends Component {
    constructor() {
        super()
        this.state = {
            currentUser: null
        }
    }

    unsubcribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            }
            setCurrentUser({ userAuth })
        })
    }

    componentWillUnmount() {
        this.unsubcribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={SignInAndSignUp} />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
