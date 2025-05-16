import React, { useState } from 'react';
import { DiceRollListener } from './components/DiceRollListener';
import DiceRoller from './components/DiceRoller';
import AppContainer from './components/AppContainer';
import { PlayerJoinModal } from './components/PlayerJoinModal';
const App: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContainer>
      <DiceRoller setIsModalOpen={setIsModalOpen}/>
      <DiceRollListener />
      <PlayerJoinModal isOpen={isModalOpen} onRequestClose={handleModalClose} />
   </AppContainer>
  );
};

export default App;
