import mongoose from "mongoose";
try {
    await mongoose.connect(process.env.URI_DB);
    console.log("😎😊 db conectada");
} catch (error) {
    console.log("😢😢 db no conectada " + error);
}