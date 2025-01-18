import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

const bcrypt = require('bcrypt')

// Route pour vérifier les informations de connexion
export async function POST(request) {
    const {userLogin, password} = await request.json()
    console.log(userLogin + password)
    // Hasher le mot de passe
    const hashedPwd = await bcrypt.hash(password, 10)

    // Vérifier si le login est bon
    try {

        const userLoginCheck = await prisma.uSERS.findUnique({
            where: {
                OR: [
                    {
                        email : userLogin,
                        password: hashedPwd
                    },
                    {
                        pseudo : userLogin,
                        password: hashedPwd
                    }
                ]
            }
        })

        // const userLoginCheck = await prisma.uSERS.findFirst({
        //     where : {
        //         pseudo : userLogin
        //     }
        // })

        // Renvoyer erreur si les info ne sont pas valides
        if(!userLoginCheck) {
            console.log("rien")
            return NextResponse.json(
                {error : "Nom d'utilisateur ou mot de passe incorrect", code : 401},
                {status : 401}) // Code HTTP : UNAUTHORIZED
        } else {
            // alert("Réussite : implémentation JWT session")
            return NextResponse.json(
                { message: "Utilisateur ajouté avec succès" },
                { status: 201 } // Code HTTP : CREATION
            )
        }

    } catch (error) {

    }
















    // Création dans la base de données
    // try {
    //     await prisma.uSERS.create({
    //         data : {
    //             pseudo,
    //             firstname,
    //             lastname,
    //             email,
    //             password : hashedPwd,
    //             birthday,
    //             sex,
    //         }
    //     })

    //     return NextResponse.json(
    //         { message: "Utilisateur ajouté avec succès" },
    //         { status: 201 } // Code HTTP : CREATION
    //     )

    // // Gestion erreur inconnue
    // } catch (error) {
    //     console.error("Erreur lors de la création de l'utilisateur :", error);

    //     return NextResponse.json(
    //         { error: "Erreur interne du serveur", code: 500 },
    //         { status: 500 } // Code HTTP : ERREUR SERVEUR
    //     )
    // }
}