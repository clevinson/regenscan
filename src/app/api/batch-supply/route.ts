import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const denom = searchParams.get("denom");

  if (!denom) {
    return NextResponse.json(
      { error: "Missing denom parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `http://mainnet.regen.network:1317/regen/ecocredit/v1/batches/${denom}/supply`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching batch supply" },
      { status: 500 }
    );
  }
}
