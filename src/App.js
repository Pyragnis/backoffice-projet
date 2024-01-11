import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./Context/SidebarContext";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Artists from "./Pages/Artists";
import Musics from "./Pages/Musics";
import Albums from "./Pages/Albums";
import Cover from "./Pages/Cover";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            duration: 2000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <div className="App min-h-screen w-full bg-gray-800">
          <Header />
          <div className="flex background -z-1">
            <Sidebar />
            <div className="h-screen w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/musics" element={<Musics />} />
                <Route path="/cover" element={<Cover />} />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
