// app/api/trips/route.ts
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// GET all trips
export async function GET(request: NextRequest) {
    const { rows } = await sql`SELECT * FROM trips;`;
    return NextResponse.json(rows);
}

// POST a new trip
export async function POST(request: NextRequest) {
    const { name, location, price } = await request.json();

    if (!name || !location || typeof price !== "number") {
        return NextResponse.json({ error: "Invalid trip data" }, { status: 400 });
    }

    const { rows } = await sql`
        INSERT INTO trips (name, location, price) 
        VALUES (${name}, ${location}, ${price}) 
        RETURNING *;
    `;
    return NextResponse.json(rows[0], { status: 201 });
}
