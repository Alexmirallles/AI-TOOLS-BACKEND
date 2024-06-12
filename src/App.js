import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Users from './Pages/Dashboard/Users/Index';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './routers/PrivateRouter';
import NotFound from './Pages/NotFound';
import './App.css'
import Content from "./Pages/Dashboard/Contents/index";
import Marketplace from "./Pages/Dashboard/Marketplace/index";
import Group from "./Pages/Dashboard/Group/index";
import Transactions from "./Pages/Dashboard/Transaction/index";

function App() {
  return (
    <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/admin/auth/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />

            <Route element={<PrivateRoute />}>
                <Route path="/admin/dashboard" element={<Users />} />
                <Route path="/admin/contents" element={<Content />} />
                <Route path="/admin/marketplaces" element={<Marketplace />} />
                <Route path="/admin/groups" element={< Group/>} />
                <Route path="/admin/transactions" element={<Transactions />} />
            </Route>
            </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
