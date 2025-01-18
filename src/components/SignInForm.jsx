"use client"

import Link from "next/link";
import { useState } from "react";

const SignInForm = () => {
    const [errorList, setErrorList] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupération infos de login
        const loginInfo = {
            userLogin: document.getElementById("user-login").value.trim(),
            password: document.getElementById("password").value.trim(),
        }

        // Requête API pour se connecter
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo)
            })
            const res = await response.json()

            // Ajout de l'erreur à l'affichage
            if (!response.ok) {
                setErrorList([...errorList, res.error])
            } else {
                alert("Réussite : Implémentation email confirmation")
            }

        } catch (error) {
            console.log(error.message)
        }
    };


    return (

        <form onSubmit={handleSubmit} className="w-[550px] min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">
        <h2 className="text-center text-5xl mb-3">Titre</h2>

        {/* Pseudo */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="user-login">user-login<span className="text-red-600">*</span></label>
            <input  type="text" name="user-login" id="user-login" required className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
            <input  type="password" name="password" id="password" required className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
        </div>

        <div>
            <button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Connexion</button>
            ou <Link href={"/signup"} className="text-blue-500 hover:underline">ou créez un compte</Link>
        </div>
        </form>
    )
}

export default SignInForm