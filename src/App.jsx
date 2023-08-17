import React from 'react'
import './App.css'
import Hero from './components/Hero'
import Content from './components/Content'
const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>
        <div className="app">
            <Hero/>
            <Content/>
        </div>
    </main>
  )
}

export default App