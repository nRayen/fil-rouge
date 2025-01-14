import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

const bcrypt = require('bcrypt')

// Route pour créer un USER
export async function POST(request) {
    const {pseudo, firstname, lastname, email, password, birthday, sex} = await request.json()


    try {
        const existingEmailCheck = await prisma.uSERS.findUnique({
            where: {
                email : email
            }
        })
        if(existingEmailCheck) {
            return NextResponse.json()
        }
    } catch (error) {

    }

    const hashedPwd = await bcrypt.hash(password, 10)



    try {
        await prisma.uSERS.create({
            data : {
                pseudo,
                firstname,
                lastname,
                email,
                password : hashedPwd,
                birthday,
                sex,
            }
        })
    } catch (error) {
        console.error(error.message)
    }
    return NextResponse.json({
        message : "Utilisateur ajouté",
        status : 200
    })
}