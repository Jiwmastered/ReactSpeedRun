import {  useState, useCallback, useContext, createContext } from 'react'

import CharSelector from './pages/CharSelector.jsx'
import BossFightPage from './pages/BossFightPage.jsx'

import { PageContext } from './contexts/PageContext.jsx'


function App() {
  const { page } = useContext(PageContext);

  if (page === 'menu') {
    return (<CharSelector />);
  } else if (page === 'boss') {
    return (<BossFightPage />);
  }
}

export default App;