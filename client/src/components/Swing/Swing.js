import React, { useContext } from 'react';
import { CTX } from 'context/Store';
const Swing = () => {
  const [appState, updateState] = useContext(CTX);
  const handleChange = (e) => {
    let { value } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_SWING', payload: value });
  };
  return (
    <div>
      <input
        type='range'
        value={appState.swing * 100}
        onChange={handleChange}
      />
    </div>
  );
};

export default Swing;