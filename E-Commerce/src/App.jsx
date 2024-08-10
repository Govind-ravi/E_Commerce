import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import APIs from "./APIs";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    try {
      const fetchCurrentUser = await fetch(APIs.Profile.url, {
        method: "get",
        credentials: "include",
      });

      const currentUser = await fetchCurrentUser.json();
      
      if(currentUser.success){
        dispatch(setUserDetails(currentUser.data))
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <div>
          <div className="">
            <Header />
            <main className="min-h-[calc(100vh-340px)]">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
