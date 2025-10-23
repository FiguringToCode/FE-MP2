import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "react-toastify/dist/ReactToastify.css"
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Leads } from './pages/Leads.jsx'
import { Sales } from './pages/Sales.jsx'
import { Reports } from './pages/Reports.jsx'
import { Agents } from './pages/Agents.jsx'
import { DataProvider } from './CRMContext.jsx'
import { AddLeadForm } from './pages/AddLeadForm.jsx'
import { ToastContainer } from 'react-toastify'
import { LeadDetails } from './pages/LeadDetails.jsx'
import { Status } from './pages/Status.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/leads',
    element: <Leads />
  },
  {
    path: '/sales',
    element: <Sales />
  },
  {
    path: '/salesAgent',
    element: <Agents />
  },
  {
    path: '/report',
    element: <Reports />
  },
  {
    path: '/leadForm',
    element: <AddLeadForm />
  },
  {
    path: '/leads/leadDetails/:leadId',
    element: <LeadDetails />
  },
  {
    path: '/status/:status',
    element: <Status />
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </DataProvider>
  </StrictMode>,
)
