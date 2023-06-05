
import { Route,Routes } from "react-router-dom";
import Header from "./components/header/Header";
import LoginArea from "./components/header/LoginArea";

import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import SharedLayout from "./pages/SharedLayout";
import BookingSchedule from "./pages/BookingSchedule";
import BookingWorker from "./pages/BookingWorker";
import Admin from "./pages/Admin";
import AdminMenupage from "./pages/AdminMenupage";
// import AdminScheduleDates from "./pages/AdminScheduleDates";
// import AdminSchedule from "./pages/AdminSchedule";
import AdminScheduleWorkers from "./pages/AdminScheduleWorkers";
import AdminAttendenceWorkers from "./pages/AdminAttendenceWorkers";
import AdminAttendence from "./pages/AdminAttendence";
import AdminWorkersScheduleDates from "./pages/AdminWorkersScheduleDates";
import AdminWorkersSchedule from "./pages/AdminWorkersSchedule";

import RquestMember from "./pages/RquestMember";
import ManageMember from "./pages/ManageMember";

import CreateWorker from "./pages/CreateWorker";
import ManageWorker from "./pages/ManageWorker";

import WorkerAuth from "./pages/WorkerAuth";
import WorkerMenu from "./pages/WorkerMenu";
import WorkerScheduleDate from './pages/WorkerScheduleDate.jsx';
import WorkerSchedule from "./pages/WorkerSchedule";
import WorkerAttendence from "./pages/WorkerAttendence";
import DeleteSlot from "./pages/DeleteSlot";
import ExpiredSlot from "./pages/ExpiredSlot";
import Exp from "./components/exp/Exp";
import ContextProvider from "./store/ContextProvider";


// import Loader from "./components/loader/Loader";
function App() {
  return (
    <ContextProvider>
     <Header/>
     <Exp />
    <LoginArea/>
    <main>
    <Routes>
    <Route path='/' element={<SharedLayout />} >
    <Route index element={<Hero/>} />
    </Route>
    <Route path="/bookingWorker" element={<BookingWorker/>}/>
    <Route path="/bookingSchedule/:id" element={<BookingSchedule/>}/>
    <Route path="/admin" element={<Admin/>}>
      <Route path="menu" element={<AdminMenupage/>}  />
      {/* <Route path='adminScheduleDates' element={<AdminScheduleDates/>} /> */}
      {/* <Route path='adminSchedule' element={<AdminSchedule/>} /> */}

      <Route path='adminAttendenceWorkers' element={<AdminAttendenceWorkers/>} />
      <Route path='adminAttendence/:id' element={<AdminAttendence/>} />

      <Route path='adminScheduleWorkers' element={<AdminScheduleWorkers/>} />
      <Route path='adminWorkersScheduleDates/:id' element={<AdminWorkersScheduleDates/>} />
      <Route path='adminWorkersSchedule/:id' element={<AdminWorkersSchedule/>} />

      <Route path='requestMember' element={<RquestMember/>} />
      <Route path='manageMember' element={<ManageMember/>} />
     
     
      <Route path='createWorker' element={<CreateWorker/>} />
      <Route path='manageWorker' element={<ManageWorker/>} />
      <Route path='deleteSlot' element={<DeleteSlot/>} />
      <Route path='expiredSlot/:id' element={<ExpiredSlot/>} />

      
    </Route>

    <Route path="/workerAuth" element={<WorkerAuth/>}>
     <Route path="workerMenu" element={<WorkerMenu/>}/>
     <Route path="workerScheduleDate" element={<WorkerScheduleDate/>}/>
     <Route path="workerSchedule/:id" element={<WorkerSchedule/>}/>
     <Route path="workerAttendece" element={<WorkerAttendence/>}/>
    </Route>

    </Routes>
    
    </main>
     <div id="services">

     <Services />
     </div>
     <div id="contact">

       <Contact />  
     </div>
     </ContextProvider>
    
  );
}

export default App;
