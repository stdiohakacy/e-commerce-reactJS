import React from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ShopPage } from './pages/shop/shop.component';
import { Header } from './components/header/header.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component'

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route path='/signin' component={SignInAndSignUp} />
            </Switch>
        </div>
    );
}

export default App;
