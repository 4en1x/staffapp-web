import React from 'react'
import AuthForm from'./auth/auth-form.component'
import '../index.css'

export default class MainPage extends React.Component {

  render() {
    return (
      <div className='main-page'>
        <AuthForm/>
      </div>
    )
  }
}
