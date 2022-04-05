import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { NewClient } from './pages/NewClient';
import { EditClient } from './pages/EditClient';
import { ShowClient } from './pages/ShowClient';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/clients" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="new" index element={<NewClient />}/>
          <Route path="edit/:id" index element={<EditClient />}/>
          <Route path=":id" index element={<ShowClient />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
