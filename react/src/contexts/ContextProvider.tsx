import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

interface Props {
    children: ReactNode
}

interface State {
    user: object,
    token: string,
    setUser: Dispatch<SetStateAction<object>>,
    setToken: (token: string) => void
}

const StateContext = createContext<State>({
    user: {},
    token: '',
    setUser: () => { },
    setToken: () => { }
})

export const ContextProvider: FC<Props> = ({ children }) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState<string>(localStorage.getItem('ACCESS_TOKEN') || '');

    const setToken = (token: string): void => {
        _setToken(token);

        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);