import { Request, Response } from 'express';
import { PublisherService } from '../services/publisherService';
import PublisherDTO from '../dtos/publisherDTO';

const publisherService = new PublisherService();

export class PublisherController {
  async createPublisher(req: Request, res: Response) {
    try {
      const publisherData: PublisherDTO = new PublisherDTO(req.body);
      const newPublisher = await publisherService.createPublisher(publisherData);
      return res.status(201).json(newPublisher);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPublishers(req: Request, res: Response) {
    try {
      const publishers = await publisherService.getPublishers();
      if (!publishers || (Array.isArray(publishers) && publishers.length === 0)) {
        return res.status(404).json({ error: 'Publishers not found' });
      }
      return res.status(200).json(publishers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPublisherById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const publisher = await publisherService.getPublisherById(id);
      if (!publisher) {
        return res.status(404).json({ error: 'Publisher not found' });
      }
      return res.status(200).json(publisher);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPublisherByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const publisher = await publisherService.getPublisherByName(name);
      if (!publisher || (Array.isArray(publisher) && publisher.length === 0)) {
        return res.status(404).json({ error: 'Publisher not found' });
      }
      return res.status(200).json(publisher);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updatePublisherById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const publisherData: PublisherDTO = new PublisherDTO(req.body);
      const updatedPublisher = await publisherService.updatePublisherById(id, publisherData);
      if (!updatedPublisher) {
        return res.status(404).json({ error: 'Publisher not found' });
      }
      return res.status(200).json(updatedPublisher);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deletePublisherById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await publisherService.deletePublisherById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}