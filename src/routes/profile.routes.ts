import { Router } from 'express';
import ProfileController from '@/controllers/profile.controller';
import { CreateProfileDto } from '@/dtos/profile.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';

class ProfileRoute implements Routes {
  public path = '/profiles';
  public router: Router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.profileController.getProfiles);
    this.router.get(`${this.path}/:id`, this.profileController.getProfileById);
    this.router.post(`${this.path}`, validationMiddleware(CreateProfileDto, 'body'), this.profileController.createProfile);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateProfileDto, 'body', true), this.profileController.updateProfile);
    this.router.delete(`${this.path}/:id`, this.profileController.deleteProfile);
  }
}

export default ProfileRoute;
