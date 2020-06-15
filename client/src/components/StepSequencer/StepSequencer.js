import React, { useContext } from 'react';
import Square from 'components/Square/Square';
import SampleSelector from 'components/SampleSelector/SampleSelector';
import { CTX } from 'context/Store';

import './StepSequencer.scss';

const StepSequencer = () => {
  const [appState, updateState] = useContext(CTX);

  const handleStepClick = (e) => {
    updateState({ type: 'CHANGE_SEQUENCE', payload: e });
  };
  const handleMouseEnter = (e) => {
    if (appState.clickActive) {
      updateState({ type: 'CHANGE_SEQUENCE', payload: e });
    }
  };
  return (
    <div className='sequencer-container'>
      <div className='sequencer'>
        {Object.keys(appState.sequencerGrid).map((inst, i) => (
          <div key={i} className='instrument-container'>
            <h2 className='instrument-name'>{inst}</h2>
            <div className='square-row'>
              {appState.sequencerGrid[inst].map((step, i) => (
                <Square
                  key={i}
                  step={i}
                  instrument={inst}
                  value={step}
                  handleClick={handleStepClick}
                  handleMouseEnter={handleMouseEnter}
                />
              ))}
            </div>
          </div>
        ))}
        <div className='timeblocks'>
          {appState.sequencerGrid.kick.map((block, i) => (
            <div className='timeblock' id={i} key={i}></div>
          ))}
        </div>
      </div>
      <SampleSelector />
    </div>
  );
};

export default StepSequencer;