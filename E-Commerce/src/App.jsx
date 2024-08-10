import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import APIs from "./APIs";

function App() {
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchCurrentUser = await fetch(APIs.Profile.url, {
          method: 'get',
          // headers: {
          //   // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          //   // 'Content-Type': 'application/json',
          // },
          credentials: "include",
        });
      
        // if (!fetchCurrentUser.ok) {
        //   throw new Error(`HTTP error! Status: ${fetchCurrentUser.status}`);
        // }
      
        const currentUser = await fetchCurrentUser.json();
        console.log(currentUser);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
        
    }
    fetchUserDetails();
  }, []);
  return (
    <>
      <div>
        <div className="">
          <Header />
          <main className="min-h-[calc(100vh-340px)]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
