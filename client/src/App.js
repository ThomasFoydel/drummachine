import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import StepSequencer from 'components/StepSequencer/StepSequencer';
import './App.scss';
import { CTX } from 'context/Store';
import Auth from 'components/Auth/Auth';
import Axios from 'axios';

import Mixer from 'components/Mixer/Mixer';
import Distortion from 'components/Distortion/Distortion';
import PingPong from 'components/PingPong/PingPong';
import Reverb from 'components/Reverb/Reverb';

function App() {
  const [appState, updateState] = useContext(CTX);
  let { isLoggedIn } = appState;

  useEffect(() => {
    window.addEventListener('mousedown', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: true });
    });
    window.addEventListener('mouseup', function () {
      updateState({ type: 'CHANGE_CLICK_ACTIVE', payload: false });
    });
  }, []);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      const foundToken = localStorage.getItem('cleanbreak-token');
      if (!foundToken) {
        updateState({
          type: 'LOGOUT',
        });
      } else {
        const setAuthInfo = async () => {
          Axios.get('/auth/user', {
            headers: { 'x-auth-token': foundToken },
          })
            .then((result) => {
              if (result.data.err) {
                console.log('err: ', result.data.err);
              } else {
                updateState({
                  type: 'LOGIN',
                  payload: { user: result.data, token: foundToken },
                });
              }
            })
            .catch((err) => {
              updateState({
                type: 'LOGOUT',
              });
            });
        };
        setAuthInfo();
      }
    }
    return () => {
      subscribed = false;
    };
  }, [updateState]);

  const closeAuth = () => {
    ReactDOM.render(<div />, document.getElementById('modal'));
  };

  const logout = () => {
    updateState({ type: 'LOGOUT' });
  };
  const login = (e) => {
    updateState(e);
  };

  const openAuth = () => {
    ReactDOM.render(
      <div className='modal'>
        <div className='modal-container'>
          <Auth CTX={CTX} closeAuth={closeAuth} login={login} />
        </div>
      </div>,
      document.getElementById('modal')
    );
  };
  return (
    <div className='App '>
      {!isLoggedIn && (
        <button className='open-auth' onClick={openAuth}>
          login / register
        </button>
      )}
      <div className='background'></div>
      <div className='components-container'>
        <div className='space'></div>
        <div className='effects-container'>
          <Mixer />
          <Distortion />
          <PingPong />
          <Reverb />
        </div>
        <div className='step-container'>
          <StepSequencer openAuth={openAuth} />
        </div>
      </div>
      {isLoggedIn && (
        <button className='logout-btn' onClick={logout}>
          logout
        </button>
      )}
    </div>
  );
}

export default App;
