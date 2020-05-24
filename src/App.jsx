import React from 'react';
import Website from 'Components/Website'

//GLOBAL BOOTSTRAP STYLE
import 'bootstrap/dist/css/bootstrap.min.css';
import { UtilityStyles } from './Styles/Utils'

function App() {
  return (
    <div className="App">
     <Website />
     <UtilityStyles />
    </div>
  );
}

export default App;
