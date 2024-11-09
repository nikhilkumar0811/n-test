// app/api/trips/[id]/route.ts
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// GET a specific trip by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { rows } = await sql`SELECT * FROM trips WHERE id = ${id};`;

    if (rows.length === 0) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
}

// DELETE a specific trip by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { rowCount } = await sql`DELETE FROM trips WHERE id = ${id};`;

    if (rowCount === 0) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Trip deleted successfully" }, { status: 200 });
}
