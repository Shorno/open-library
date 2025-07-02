import {BrowserRouter, Routes, Route} from 'react-router';
import AppLayout from "./layout/AppLayout.tsx";
import ListPage from "./pages/ListPage.tsx";
import HomePage from "./pages/HomePage.tsx";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="list" element={<ListPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
