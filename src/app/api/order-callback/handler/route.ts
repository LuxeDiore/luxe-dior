import Order from "@/database/schema/OrderSchema";
import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { response } = await req.json();
    const decodedResponse = Buffer.from(response, "base64").toString();
    const jsonResponse = JSON.parse(decodedResponse);
    console.log(jsonResponse);
    const merchantTransactionId = jsonResponse.data.merchantTransactionId;
    const paymentStatus = jsonResponse.code;
    const currOrder = await Order.findOne({
      paymentId: merchantTransactionId,
    });
    currOrder.paymentStatus = paymentStatus;
    if (jsonResponse.success == true) {
      const paymentMethod = jsonResponse.data.paymentInstrument.type;
      currOrder.paymentMethod = paymentMethod;
      currOrder.orderStatus = "ORDER CONFIRMED";
    }
    await currOrder.save();
    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Retrieve paymentId from the URL parameters
    const paymentId = req.nextUrl.searchParams.get("paymentId");
    const currOrder = await Order.findOne({
      paymentId: paymentId,
    });
    // console.log(currOrder);
    if (!currOrder) {
      return NextResponse.json(
        {
          success: true,
          paymentStatus: "No order exists with paymentId : paymentId",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        paymentStatus: currOrder.paymentStatus,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing request:", err);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { success: false, paymentStatus: "Failed to process the request" },
      { status: 500 }
    );
  }
}
