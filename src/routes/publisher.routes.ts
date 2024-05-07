import { Router } from "express";
import { PublisherController } from "../controllers/publisherController";
const publisherController = new PublisherController();
const publisherRoutes = Router();

publisherRoutes.post("/", publisherController.createPublisher);
publisherRoutes.get("/", publisherController.getPublishers);
publisherRoutes.get("/:id", publisherController.getPublisherById);
publisherRoutes.get("/name/:name", publisherController.getPublisherByName);
publisherRoutes.put("/update/:id", publisherController.updatePublisherById);
publisherRoutes.delete("/delete/:id", publisherController.deletePublisherById);

export { publisherRoutes };