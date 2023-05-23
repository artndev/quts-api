import express from "express";
import { saveQuoteValidation, idParamValidation } from "./validations.js";
import { deleteQuote, getQuote, getRandomQuote, saveQuote } from "./controllers/Controller.js";
import handleValidationErrors from "./handleValidationErrors.js";
import { verifyAuthToken } from "./utils.js";
const app = express();
app.use(express.json());


app.get("/", (_, res) => {
    res.status(200).json({
        message: "The QUOTES-REST-API. It's very simple but useful! :)",
        description: {
            createANewQuote: "[POST] /quotes",
            deleteAQuote: "[DELETE] /quotes/:id",
            getAQuote: "[GET] /quotes/:id",
            getARandomQuote: "[GET] /random",
        }
    });
});
app.get("/random", getRandomQuote);
app.get("/quotes/:id", idParamValidation, handleValidationErrors, getQuote);
app.post("/quotes", verifyAuthToken, saveQuoteValidation, handleValidationErrors, saveQuote);
app.delete("/quotes/:id", verifyAuthToken, idParamValidation, handleValidationErrors, deleteQuote);

app.listen(8000, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("The server is listening on the port / Сервер на порту - 8000!\nhttps://localhost:8000/");
});
