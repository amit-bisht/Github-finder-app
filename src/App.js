import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/screens/Home";
import NotFound from "./components/screens/NotFound";
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './store/user-context'
import { AlertContextProvider } from './alert/alert-context'
import User from "./components/screens/User";
import Alert from "./components/UI/Alert";
import About from "./components/screens/About";

function App() {
  return (
    <UserContextProvider>
      <AlertContextProvider>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Alert />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/user/:username" exact element={<User/>}/>
              <Route path="/about" exact element={<About/>}/>
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AlertContextProvider>
    </UserContextProvider>
  );
}

export default App;
