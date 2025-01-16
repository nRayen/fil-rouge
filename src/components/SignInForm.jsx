"use client"

import Link from "next/link";

const SignInForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            pseudo: document.getElementById("pseudo").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
        }

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify(newUser)
            })

            if (response) {
                const data = await response.json()
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (

        <form onSubmit={handleSubmit} className="w-full max-w-550px min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">
        <h2 className="text-center text-5xl mb-3">Titre</h2>

        {/* Pseudo */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="pseudo">Pseudo<span className="text-red-600">*</span></label>
            <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="pseudo" id="pseudo" required />
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
            <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="password" name="password" id="password" />
        </div>

        <div>
            <button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Connexion</button>
            ou <Link href={"/signup"} className="text-blue-500 hover:underline">ou créez un compte</Link>
        </div>
        </form>
    )
}

export default SignInForm