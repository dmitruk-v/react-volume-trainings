import React from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { RootState, WeekScheduleModel } from "./store";
import { useSelector } from 'react-redux';
import Schedule from './components/schedule/schedule';

function App() {

  const schedule = useSelector<RootState, WeekScheduleModel>(state => state.weekSchedule);

  console.log("App called, schedule:", schedule);


  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__main">
        <div className="app__schedule">
          <Schedule
            initialSchedule={schedule}
          />
        </div>
      </div>
      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
