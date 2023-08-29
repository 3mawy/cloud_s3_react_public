import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import Loader from './components/Loaders/Loader';
import routes from './routes';
import Dashboard from "./pages/Dashboard.jsx";
import {ProtectedRoute} from "./routes/ProtectedRoute.jsx";
import RegistrationLayout from "./layout/RegistrationLayout.jsx";
import SigninForm from "./components/Auth/SigninForm.jsx";
import SignupForm from "./components/Auth/SignupForm.jsx";

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {

    return (
        <>
            <Routes>
                <Route path="/auth" element={<RegistrationLayout/>}>
                    <Route path="signin" element={<SigninForm/>}/>
                    <Route path="signup" element={<SignupForm/>}/>
                </Route>
                <Route element={<DefaultLayout/>}>
                    {routes.map(({path, component: Component}) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <Suspense fallback={<Loader/>}>
                                    <ProtectedRoute>
                                        <Component/>
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </>
    )
}

export default App
