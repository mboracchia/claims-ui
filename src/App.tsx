import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import {Box} from "@mui/material";
import Claims from "./screens/Claims/Claims";
import Login from "./screens/Login/Login";
import ClaimScreen from "./screens/Claims/Claim/ClaimScreen";
import NewClaim from "./screens/Claims/NewClaim/NewClaim";
import NotFound from "./screens/NotFound/NotFound";
import {mockedClaims} from "./mocks";

export default function App() {
    return (
        <Router>
            <Box pt={12}>
                <Switch>
                    <Route path="/employee" exact>
                        <Claims claims={mockedClaims} userIsEmployee={true}/>
                    </Route>
                    <Route path="/client" exact>
                        <Claims claims={mockedClaims}/>
                    </Route>
                    <Redirect exact from={'/'} to={'login'}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/claim/new" exact component={NewClaim}/>
                    <Route path="/claim/:claimId" exact component={ClaimScreen}/>
                    <Route component={NotFound}/>
                </Switch>
            </Box>
        </Router>
    );
}
