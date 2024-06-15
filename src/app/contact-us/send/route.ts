import sendEmailServerHandler from "@/app/contact-us/action";
export async function POST(request: Request) {
  try {
    const { fname, lname, email, query } = await request.json();
    const emailResponse = await sendEmailServerHandler({
      email,
      fname,
      lname,
      query,
    });

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Error sending query email.",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error sending query email", err);
    return Response.json(
      {
        success: false,
        message: "Error sending query email.",
      },
      {
        status: 500,
      }
    );
  }
}
