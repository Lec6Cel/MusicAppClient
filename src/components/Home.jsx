import React from "react";
import Header from "./Header";
import DashboardNewSongs from "./DashboardNewSongs";
const Home = () => {
    return(
        <div className="w-full h-auto flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to to-blue-900">
            <Header />
            <div className="flex justify-center mt-10">
                <DashboardNewSongs />
            </div>
        </div>
    )
}
export default Home;