import React from "react";
import Header from "./Header";
import DashboardSong from "./DashboardSongs";
const Home = () => {
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to to-blue-900">
            <Header />

            <div className="flex justify-center mt-10 flex-grow">
            <DashboardSong/>
            </div>
        </div>
    )
}
export default Home;