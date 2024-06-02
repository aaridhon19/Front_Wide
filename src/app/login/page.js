"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
            // Redirect user to homepage if already logged in
            window.location.href = "/";
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        try {
            console.log(username, password);
            const response = await axios.post("http://localhost:4000/login", {
                username,
                password,
            });
            const { user } = response.data; // Terima data pengguna dari server setelah login berhasil
            localStorage.setItem("userId", user.id); // Simpan ID pengguna ke localStorage
            localStorage.setItem("username", user.username);
            // Simpan data pengguna lainnya ke localStorage jika diperlukan
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Sukses",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "/";
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login Gagal",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoggedIn) {
        return null; // If logged in, don't render anything
    }

    return (
        <div className="w-full h-screen bg-base-200">
            <div className="p-4">
                <h1 className="pl-3">
                    <span className="text-3xl font-bold">Form Login</span>
                    <hr className="my-2 border-blueGray-300 mx-auto" style={{ opacity: 0.6 }} />
                </h1>
                <form onSubmit={login}>
                    <div className="field"></div>
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Name"
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </label>

                    {/* // submit */}
                    <button type="submit" className="btn btn-active btn-primary mt-2">
                        Login
                    </button>
                    <div />
                </form>
            </div>
        </div>
    );
}
