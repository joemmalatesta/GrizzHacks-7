import type { Actions } from './$types';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_PASSWORD, MONGO_USERNAME, RESEND_KEY } from '$env/static/private';
import { Resend } from 'resend';



const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@people.1psmn.mongodb.net/?retryWrites=true&w=majority&appName=People`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const resend = new Resend(RESEND_KEY);

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = String(formData.get('email')).toLowerCase();
        if (!email) {
            return { success: false, message: "Email is required" };
        }
        // Add to mongo
        try {
            // Connect the client to the server
            await client.connect();

            // Define the database and collection
            const db = client.db("people");
            const collection = db.collection("users");
            
            const existingEmail = await collection.findOne({ email: email });

            if (existingEmail) {
                return { success: false, message: "This email is already registered" };
            }

            // Create a new email document
            const emailDocument = {
                email: email,
                addedAt: new Date(), // Optional: Add timestamp
            };

            // Insert the email into the collection
            const result = await collection.insertOne(emailDocument);

            // Success message
            console.log(`Email added with id: ${result.insertedId}`);
            await sendEmail(email)

            return { success: true, message: "Email added successfully" };

        } catch (error) {
            console.error("Error adding email:", error);
            return { success: false, message: "Failed to add email" };
        } finally {
            // Close the client connection if needed
            await client.close();
        }
    },
} satisfies Actions;





async function sendEmail(email: string) {
  const { data, error } = await resend.emails.send({
    from: 'GrizzHacks <hey@grizzhacks.org>',
    to: [email],
    subject: "You're in the know!",
    html: "Hey there 👋<br><br>Glad to see you're interested in joining us this year for our Quackathon...<br>Just wanted to let you know we got your email and you'll be the first to know as soon as we open up applications.<br>Looking forward to seeing you soon!!",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
