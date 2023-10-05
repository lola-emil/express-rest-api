import db from "../db"

export interface User {
    user_id?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string
}

export async function insert(data: User): Promise<any[]> {
    const result = await db("tbl_user").insert(data);
    return result;
}

export async function findById(id: string): Promise<User[]> {
    const result = await db("tbl_user").select().where("user_id", id);
    return result;
}

export async function findByEmail(email: string): Promise<User[]> {
    const result = await db("tbl_user").select().where("email", email);
    return result;
}

export async function deleteById(id: string) {
    const result = await db("tbl_user").delete().where("user_id", id);
    return result;
}

export async function updateById(id: string, data: User) {
    const result = await db("tbl_user").update(data).where("user_id", id);
    return result;
}