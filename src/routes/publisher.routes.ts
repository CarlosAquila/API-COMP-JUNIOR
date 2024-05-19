import { Router } from "express";
import { PublisherController } from "../controllers/publisherController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const publisherController = new PublisherController();
const publisherRoutes = Router();

publisherRoutes.post("/", permissionMiddleware(["create publisher"]) ,publisherController.createPublisher);

publisherRoutes.use(permissionMiddleware(["read publisher"]));

publisherRoutes.get("/", publisherController.getPublishers);
publisherRoutes.get("/:id", publisherController.getPublisherById);
publisherRoutes.get("/name/:name", publisherController.getPublisherByName);

publisherRoutes.put("/update/:id", permissionMiddleware(["update publisher"]), publisherController.updatePublisherById);
publisherRoutes.delete("/delete/:id", permissionMiddleware(["delete publisher"]), publisherController.deletePublisherById);

export { publisherRoutes };