import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import CircleRange from 'components/CircleRange/CircleRange';
const PanControl = ({ name }) => {
  const [appState, updateState] = useContext(CTX);

  const handlePan = (e, tag) => {
    updateState({ type: 'CHANGE_PAN', payload: { type: name, value: e } });
  };
  return (
    <div className='pan-control'>
      <CircleRange
        size='20'
        min={-1}
        max={1}
        step={0.5}
        type='range'
        onChange={handlePan}
        value={appState.panVolPans[name] * 100}
      />
    </div>
  );
};

export default PanControl;
