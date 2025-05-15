import DiceRoller from './components/DiceRoller'
import DiceRollListener from './components/DiceRollListener'
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">D&D Initiative Tracker</h1>
        <DiceRoller />
        <DiceRollListener />
      </div>
    </div>
  )
}

export default App
