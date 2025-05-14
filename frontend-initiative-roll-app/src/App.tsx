import DiceRoller from './components/DiceRoller'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">D&D Initiative Tracker</h1>
        <DiceRoller />
      </div>
    </div>
  )
}

export default App
