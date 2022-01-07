import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './screen/Home'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {TransactionProvider} from './context/TransactionContext'
function App() {
  return (
    <div className="min-h-screen min-w-full">
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </TransactionProvider>
    </div>
  )
}

export default App
