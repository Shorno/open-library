import {BrowserRouter, Routes, Route} from 'react-router';
import AppLayout from "./layout/AppLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import AddBook from "./pages/AddBookPage.tsx";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/add-book" element={<AddBook/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
