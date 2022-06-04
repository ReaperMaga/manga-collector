import { FormEvent, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { AiOutlineLock } from 'react-icons/ai';
import Layout from '../layouts/Layout';

import {toast} from "react-toastify"
import userStore from "../store/UserStore";
import {useRouter} from "next/router";

const Login: NextPageWithLayout = () => {


    const router = useRouter()

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        userStore.login(password, (success) => {
            setTimeout(() => {
                setLoading(false);
                if(success) {
                    router.push("/").then((s) => {
                        setTimeout(() => {
                            toast.success("Welcome back")
                        }, 100)
                    })
                } else {
                    toast.error('Wrong credentials');
                }

            }, 700);
        })

    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col w-full py-8 sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-zinc-800 rounded-md">
                <div className="flex flex-col items-center w-full">
                    <span className="flex items-center text-2xl text-gray-400 space-x-2">
                        <span className="pt-1 pr-1">
                            <AiOutlineLock />
                        </span>
                        Manga Collector
                    </span>
                    <span className="text-lg text-gray-500">Please type in your password</span>
                </div>
                <div className="flex flex-col items-center pt-7">
                    <form className="flex flex-col space-y-10 pt-2" onSubmit={login}>
                        <input
                            onChange={event => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                            className="px-2 py-2 text-gray-400 rounded-md bg-zinc-700 focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center py-2 mx-auto text-gray-300 bg-green-700 space-x-2 w-28 transition hover:bg-green-600 rounded-md"
                        >
                            {loading && (
                                <span className="animate-spin">
                                    <ImSpinner />
                                </span>
                            )}
                            <span>Sign in</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

Login.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>;
};

export default Login;
