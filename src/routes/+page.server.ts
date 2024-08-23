import type { Actions } from './$types';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_PASSWORD, MONGO_USERNAME } from '$env/static/private';

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@people.1psmn.mongodb.net/?retryWrites=true&w=majority&appName=People`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
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
