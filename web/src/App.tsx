import './App.css';
import Layout from './screen/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteManager from './screen/RouteManager';
import { Box } from '@mui/material';
import { createContext, useRef, useState } from 'react';
import { MyMessageBox, MyMessageBoxRef } from './components/MyMessageBox';
import { LoadingModal, LoadingModalRef } from './components/LoadingModal';

type MsgContent = {
  msg: string,
  type: string,
  showAlert: (type: string, msg: string) => void
};

type LoadingModelContent = {
  showLoading: () => void,
  hideLoading: () => void,
}

const MsgContext = createContext<MsgContent>({
  msg: "",
  type: "",
  showAlert: () => { },
});

const LoadingModalContext = createContext<LoadingModelContent>({
  showLoading: () => { },
  hideLoading: () => { },
});

function App() {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const alertElement = useRef<MyMessageBoxRef>(null);
  const loadingElement = useRef<LoadingModalRef>(null);

  const showAlert = (type: string, msg: string) => {
    setMsg(msg);
    setType(type);
    alertElement.current!.show();
  }

  const showLoading = () => {
    loadingElement.current?.show();
  }

  const hideLoading = () => {
    loadingElement.current?.hide();
  }

  return (
    <div className="App">
      <LoadingModalContext.Provider value={{ showLoading, hideLoading }}>
        <MsgContext.Provider value={{ msg, type, showAlert }}>
          <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
              <Layout />
              <Box component="main" style={{ padding: '0 10px 10px', marginTop: '90px', width: '100%' }}>
                <Routes>
                  {
                    RouteManager.RouteCollection.map((route, index) => {
                      return (
                        <Route key={`route-${index}`} path={route.url} element={route.element}></Route>
                      )
                    })
                  }
                </Routes>
              </Box>
            </Box>
          </BrowserRouter>
          <MyMessageBox ref={alertElement} msg={msg} type={type} />
        </MsgContext.Provider>
      </LoadingModalContext.Provider>
      <LoadingModal ref={loadingElement} />
    </div>
  );
}

export { App, MsgContext, LoadingModalContext };

