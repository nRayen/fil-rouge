"use client"

import Link from "next/link";
import FormError from "./FormError";
import { useState } from "react";

const SignUpForm = () => {
    const [errorList, setErrorList] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorList([])
        // Récupération données formulaire
        const newUser = {
            pseudo: document.getElementById("pseudo").value.trim(),
            firstname: document.getElementById("firstname").value.trim(),
            lastname: document.getElementById("lastname").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
            birthday : new Date(document.getElementById("birthday").value).toISOString() || null,
            sex : document.getElementById("sex").value || null
        }

        // Requête API pour créer l'utilisateur
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
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
    <form onSubmit={handleSubmit}  id="signup-form" className="w-550px min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">

        {/* Titre */}
        <h2 className="text-center text-5xl mb-3">Titre</h2>

        {/* Affichage des erreurs */}
        {
            errorList.map((err, ind) => <FormError error={err} key={ind}/>)
        }

        {/* Pseudo */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="pseudo">Pseudo<span className="text-red-600">*</span></label>
            <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="pseudo" id="pseudo" required />
        </div>

        {/* Email */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="email">Email<span className="text-red-600">*</span></label>
            <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="email" name="email" id="email" required />
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
            <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
            <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="password" name="password" id="password" />
        </div>

        <hr className="backdrop-blur-2xl h-2px opacity-35 bg-slate-300 w-full mb-4 mt-6"></hr>

        {/* Nom + Prénom */}
        <section className="flex justify-between gap-8">
            <div className="mb-4 w-1/2">
                <label className="block text-base font-medium mb-2" htmlFor="firstname">Prénom<span className="text-red-600">*</span></label>
                <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="firstname" id="firstname" required />
            </div>

            <div className="mb-4 w-1/2">
                <label className="block text-base font-medium mb-2" htmlFor="lastname">Nom<span className="text-red-600">*</span></label>
                <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="lastname" id="lastname" required />
            </div>
        </section>

        {/* Birthdate + Genre */}
        <section className="flex justify-between gap-8">
            <div className="mb-4 w-1/2">
                <label className="block text-base font-medium mb-2" htmlFor="birthday">Date de naissance</label>
                <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="date" name="birthday" id="birthday" />
            </div>

            <div className="mb-4 w-1/2">
                <label className="block text-base font-medium mb-2" htmlFor="sex">Sexe</label>
                <select name="sex" defaultValue={null} id="sex" className="text-black py-3 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                    <option value={null}>Choisissez une option</option>
                    <option value="h">Homme</option>
                    <option value="f">Femme</option>
                    <option value="n">Autre</option>
                </select>
            </div>
        </section>

        <div>
            <button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Confirmer</button>
            ou <Link href={"/signin"} className="text-blue-500 hover:underline">connectez vous.</Link>
        </div>
    </form>
  )
}

export default SignUpForm