import { Router } from "express";
import { searchEngine } from "../controllers/controller-search_engine";

const searchEngineRouter = Router();
searchEngineRouter.post("/users/:searchTerm", searchEngine.getUsers);

export default searchEngineRouter;
