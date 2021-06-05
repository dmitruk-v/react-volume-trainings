import React from 'react';
import './App.css';
import Training, { TrainingModel } from "./training/training";

const mockTraining: TrainingModel = {
  trainingId: "training1",
  exercises: [
    {
      exerciseId: "exercise1",
      name: "my first exercise",
      sets: [
        { setId: "set1", reps: 8, weight: 50 },
        { setId: "set2", reps: 8, weight: 50 },
        { setId: "set3", reps: 6, weight: 55 },
        { setId: "set4", reps: 6, weight: 55 },
        { setId: "set5", reps: 6, weight: 55 },
      ]
    },
    {
      exerciseId: "exercise2",
      name: "my second exercise",
      sets: [
        { setId: "set1", reps: 8, weight: 50 },
        { setId: "set2", reps: 8, weight: 50 },
        { setId: "set3", reps: 6, weight: 55 },
        { setId: "set4", reps: 6, weight: 55 },
        { setId: "set5", reps: 6, weight: 55 },
      ]
    },
    {
      exerciseId: "exercise3",
      name: "my third exercise",
      sets: [
        { setId: "set1", reps: 8, weight: 50 },
        { setId: "set2", reps: 8, weight: 50 },
        { setId: "set3", reps: 6, weight: 55 },
        { setId: "set4", reps: 6, weight: 55 },
        { setId: "set5", reps: 6, weight: 55 },
      ]
    },
  ]
}

function App() {
  return (
    <div className="app">
      <Training training={mockTraining} />
    </div>
  );
}

export default App;
