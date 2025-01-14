"use client"

import Link from "next/link";

const SignUpForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            pseudo: document.getElementById("pseudo").value.trim(),
            firstname: document.getElementById("firstname").value.trim(),
            lastname: document.getElementById("lastname").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
            birthday : new Date(document.getElementById("birthday").value).toISOString() || null,
            sex : document.getElementById("sex").value || null
        }
        console.log(newUser.birthday)

        try {
            const response = await fetch("/api/auth/signup", {
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
    <form onSubmit={handleSubmit} className="w-1/2 min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">
    <div className="mb-4">
        <label className="block text-base font-medium mb-2" htmlFor="pseudo">Pseudo<span className="text-red-600">*</span></label>
        <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="pseudo" id="pseudo" required />
    </div>

    <div className="mb-4">
        <label className="block text-base font-medium mb-2" htmlFor="email">Email<span className="text-red-600">*</span></label>
        <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="email" name="email" id="email" required />
    </div>

    <div className="mb-4">
        <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
        <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="password" name="password" id="password" />
    </div>

    <div className="backdrop-blur-2xl h-1 opacity-35 bg-slate-300 w-full mb-2"></div>

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