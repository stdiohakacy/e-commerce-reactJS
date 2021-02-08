import React, { Component } from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ShopPage } from './pages/shop/shop.component';
import { Header } from './components/header/header.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component'
import { auth, createUserProfileDocument } from './firebase/firebase.util'

class App extends Component {
    constructor() {
        super()
        this.state = {
            currentUser: null
        }
    }

    unsubcribeFromAuth = null

    componentDidMount() {
        auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    })
                })
            }
            this.setState({ currentUser: userAuth })
        })
    }

    componentWillUnmount() {
        this.unsubcribeFromAuth()
    }

    render() {
        const { currentUser } = this.state
        return (
            <div>
                <Header currentUser={currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={SignInAndSignUp} />
                </Switch>
            </div>
        )
    }
}

export default App;
