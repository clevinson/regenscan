import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "http://mainnet.regen.network:1317/regen/ecocredit/v1/classes"
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching credit classes" },
      { status: 500 }
    );
  }
}
