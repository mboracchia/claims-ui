import React, {useCallback, useReducer} from "react";
import {Alert, Box, Button, Card, CardActions, CardContent, Divider, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {Client, Employee, User} from "../models";
import {mockedClient, mockedEmployee} from "../mocks";

export type LoginCardProps = {}

export type LoginCardState = {
    username: string,
    password: string,
    showLoginError: boolean,
}

const initialState: LoginCardState = {
    username: '',
    password: '',
    showLoginError: false
};

const mockedEmployeeUsers: Employee[] = [mockedEmployee];

const mockedClientUsers: Client[] = [mockedClient];

const reducer = (state: LoginCardState, action: any) => {
    switch (action.type) {
        case "handleUsernameChange":
            return {...state, username: action.value};
        case "handlePasswordChange":
            return {...state, password: action.value};
        case "handleAlertOpen":
            return {...state, showLoginError: true};
        case "handleAlertClose":
            return {...state, showLoginError: false};
        default:
            throw new Error();
    }
};

const handleUsernameChange = (u: string) => ({type: "handleUsernameChange", value: u});
const handlePasswordChange = (p: string) => ({type: "handlePasswordChange", value: p});
const handleAlertOpen = () => ({type: 'handleAlertOpen'});
const handleAlertClose = () => ({type: 'handleAlertClose'});

export default function LoginCard(props: LoginCardProps) {

    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleLogin(history: any) {
        const loggedInUser = getUser();

        if (loggedInUser) {
            if ("role" in loggedInUser) {
                history.push('/employee')
            } else {
                history.push('/client')
            }
        } else {
            dispatch(handleAlertOpen())
        }
    }

    function getUser(): Employee | Client | undefined {
        let matchingEmployee = mockedEmployeeUsers.filter(employee => employee.username === state.username && employee.password === state.password)
        let matchingClient = mockedClientUsers.filter(client => client.username === state.username && client.password === state.password)

        return matchingEmployee.length === 1 ? matchingEmployee[0] : matchingClient.length === 1 ? matchingClient[0] : undefined;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <Typography variant="body2" component="div" sx={{paddingBottom: '16px'}}>
                    Acceso para clientes y empleados. Ingrese las credenciales provistas por su administrador de
                    sistemas.
                </Typography>
                <Divider/>
                <Box p={1}>
                    <TextField id="username-field"
                               label="Usuario"
                               variant="outlined"
                               fullWidth
                               margin="normal"
                               value={state.username}
                               onChange={(e) => dispatch(handleUsernameChange(e.target.value))}
                    />
                    <TextField id="password-field"
                               label="Contraseña"
                               variant="outlined"
                               fullWidth
                               margin="normal"
                               value={state.password}
                               onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
                               type={'password'}
                    />
                    {
                        state.showLoginError &&
                        <Alert severity="warning" sx={{marginTop: '16px'}} onClose={() => dispatch(handleAlertClose())}>
                            Sus credenciales son incorrectas. Verifique los datos ingresados y pruebe nuevamente.
                        </Alert>
                    }
                </Box>
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button fullWidth size="large" color="primary" onClick={() => handleLogin(history)}>
                    Iniciar Sesión
                </Button>
            </CardActions>
        </Card>
    );
}