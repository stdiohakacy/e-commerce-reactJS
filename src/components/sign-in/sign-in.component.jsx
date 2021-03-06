import React, { Component } from 'react'
import { CustomButton } from '../custom-button/custom-button.component'
import { FormInput } from '../form-input/form-input.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.util'
import './sign-in.styles.scss'

export class SignIn extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { email, password } = this.state
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                email: '',
                password: ''
            })    
        } catch (error) {
            console.error(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <FormInput
                        name='email'
                        type='email'
                        label='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required />
                    <label>Password</label>
                    <FormInput
                        name='password'
                        type='password'
                        label='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
