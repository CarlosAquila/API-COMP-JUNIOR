import { PublisherModel } from '../models/publisherModel';
import PublisherDTO from '../dtos/publisherDTO';
const publisherModel = new PublisherModel();

export class PublisherService {
  async createPublisher(data: PublisherDTO) {
    try {
      return publisherModel.createPublisher(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPublishers() {
    try {
      return publisherModel.getPublishers();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPublisherById(id: string) {
    try {
      return publisherModel.getPublisherById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPublisherByName(name: string) {
    try {
      return publisherModel.getPublisherByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updatePublisherById(id: string, data: PublisherDTO) {
    try {
      return publisherModel.updatePublisherById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deletePublisherById(id: string) {
    try {
      return publisherModel.deletePublisherById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}