import { fareSchema } from "./validations/fare"; // Assuming you have a Zod schema

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = fareSchema.parse(data);

    const newFare = await prisma.fare.create({
      data: validatedData,
    });

    return NextResponse.json({ message: "Fare added successfully", fare: newFare });
  } catch (error) {
    console.error("Error adding fare:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to add fare" }, { status: 500 });
  }
}
